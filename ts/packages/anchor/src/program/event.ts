import { PublicKey } from "@safecoin/web3.js";
import * as assert from "assert";
import { IdlEvent, IdlEventField } from "../idl.js";
import { Coder } from "../coder/index.js";
import { DecodeType } from "./namespace/types.js";
import Provider from "../provider.js";

const PROGRAM_LOG = "Program log: ";
const PROGRAM_DATA = "Program data: ";
const PROGRAM_LOG_START_INDEX = PROGRAM_LOG.length;
const PROGRAM_DATA_START_INDEX = PROGRAM_DATA.length;

// Deserialized event.
export type Event<
  E extends IdlEvent = IdlEvent,
  Defined = Record<string, never>
> = {
  name: E["name"];
  data: EventData<E["fields"][number], Defined>;
};

export type EventData<T extends IdlEventField, Defined> = {
  [N in T["name"]]: DecodeType<(T & { name: N })["type"], Defined>;
};

type EventCallback = (event: any, slot: number, signature: string) => void;

export class EventManager {
  /**
   * Program ID for event subscriptions.
   */
  private _programId: PublicKey;

  /**
   * Network and wallet provider.
   */
  private _provider: Provider;

  /**
   * Event parser to handle onLogs callbacks.
   */
  private _eventParser: EventParser;

  /**
   * Maps event listener id to [event-name, callback].
   */
  private _eventCallbacks: Map<number, [string, EventCallback]>;

  /**
   * Maps event name to all listeners for the event.
   */
  private _eventListeners: Map<string, Array<number>>;

  /**
   * The next listener id to allocate.
   */
  private _listenerIdCount: number;

  /**
   * The subscription id from the connection onLogs subscription.
   */
  private _onLogsSubscriptionId: number | undefined;

  constructor(programId: PublicKey, provider: Provider, coder: Coder) {
    this._programId = programId;
    this._provider = provider;
    this._eventParser = new EventParser(programId, coder);
    this._eventCallbacks = new Map();
    this._eventListeners = new Map();
    this._listenerIdCount = 0;
  }

  public addEventListener(
    eventName: string,
    callback: (event: any, slot: number, signature: string) => void
  ): number {
    let listener = this._listenerIdCount;
    this._listenerIdCount += 1;

    // Store the listener into the event map.
    if (!this._eventListeners.has(eventName)) {
      this._eventListeners.set(eventName, []);
    }
    this._eventListeners.set(
      eventName,
      (this._eventListeners.get(eventName) ?? []).concat(listener)
    );

    // Store the callback into the listener map.
    this._eventCallbacks.set(listener, [eventName, callback]);

    // Create the subscription singleton, if needed.
    if (this._onLogsSubscriptionId !== undefined) {
      return listener;
    }

    this._onLogsSubscriptionId = this._provider!.connection.onLogs(
      this._programId,
      (logs, ctx) => {
        if (logs.err) {
          return;
        }

        for (const event of this._eventParser.parseLogs(logs.logs)) {
          const allListeners = this._eventListeners.get(event.name);

          if (allListeners) {
            allListeners.forEach((listener) => {
              const listenerCb = this._eventCallbacks.get(listener);

              if (listenerCb) {
                const [, callback] = listenerCb;
                callback(event.data, ctx.slot, logs.signature);
              }
            });
          }
        }
      }
    );

    return listener;
  }

  public async removeEventListener(listener: number): Promise<void> {
    // Get the callback.
    const callback = this._eventCallbacks.get(listener);
    if (!callback) {
      throw new Error(`Event listener ${listener} doesn't exist!`);
    }
    const [eventName] = callback;

    // Get the listeners.
    let listeners = this._eventListeners.get(eventName);
    if (!listeners) {
      throw new Error(`Event listeners don't exist for ${eventName}!`);
    }

    // Update both maps.
    this._eventCallbacks.delete(listener);
    listeners = listeners.filter((l) => l !== listener);
    this._eventListeners.set(eventName, listeners);
    if (listeners.length === 0) {
      this._eventListeners.delete(eventName);
    }

    // Kill the websocket connection if all listeners have been removed.
    if (this._eventCallbacks.size == 0) {
      assert.ok(this._eventListeners.size === 0);
      if (this._onLogsSubscriptionId !== undefined) {
        await this._provider!.connection.removeOnLogsListener(
          this._onLogsSubscriptionId
        );
        this._onLogsSubscriptionId = undefined;
      }
    }
  }
}

export class EventParser {
  private coder: Coder;
  private programId: PublicKey;

  constructor(programId: PublicKey, coder: Coder) {
    this.coder = coder;
    this.programId = programId;
  }

  // Each log given, represents an array of messages emitted by
  // a single transaction, which can execute many different programs across
  // CPI boundaries. However, the subscription is only interested in the
  // events emitted by *this* program. In achieving this, we keep track of the
  // program execution context by parsing each log and looking for a CPI
  // `invoke` call. If one exists, we know a new program is executing. So we
  // push the programId onto a stack and switch the program context. This
  // allows us to track, for a given log, which program was executing during
  // its emission, thereby allowing us to know if a given log event was
  // emitted by *this* program. If it was, then we parse the raw string and
  // emit the event if the string matches the event being subscribed to.
  public *parseLogs(logs: string[], errorOnDecodeFailure: boolean = false) {
    const logScanner = new LogScanner(logs);
    const execution = new ExecutionContext();
    let log = logScanner.next();
    while (log !== null) {
      let [event, newProgram, didPop] = this.handleLog(
        execution,
        log,
        errorOnDecodeFailure
      );
      if (event) {
        yield event;
      }
      if (newProgram) {
        execution.push(newProgram);
      }
      if (didPop) {
        execution.pop();
      }
      log = logScanner.next();
    }
  }

  // Main log handler. Returns a three element array of the event, the
  // next program that was invoked for CPI, and a boolean indicating if
  // a program has completed execution (and thus should be popped off the
  // execution stack).
  private handleLog(
    execution: ExecutionContext,
    log: string,
    errorOnDecodeFailure: boolean
  ): [Event | null, string | null, boolean] {
    // Executing program is this program.
    if (
      execution.stack.length > 0 &&
      execution.program() === this.programId.toString()
    ) {
      return this.handleProgramLog(log, errorOnDecodeFailure);
    }
    // Executing program is not this program.
    else {
      return [null, ...this.handleSystemLog(log)];
    }
  }

  // Handles logs from *this* program.
  private handleProgramLog(
    log: string,
    errorOnDecodeFailure: boolean
  ): [Event | null, string | null, boolean] {
    // This is a `msg!` log or a `sol_log_data` log.
    if (log.startsWith(PROGRAM_LOG) || log.startsWith(PROGRAM_DATA)) {
      const logStr = log.startsWith(PROGRAM_LOG)
        ? log.slice(PROGRAM_LOG_START_INDEX)
        : log.slice(PROGRAM_DATA_START_INDEX);
      const event = this.coder.events.decode(logStr);

      if (errorOnDecodeFailure && event === null) {
        throw new Error(`Unable to decode event ${logStr}`);
      }
      return [event, null, false];
    }
    // System log.
    else {
      return [null, ...this.handleSystemLog(log)];
    }
  }

  // Handles logs when the current program being executing is *not* this.
  private handleSystemLog(log: string): [string | null, boolean] {
    // System component.
    const logStart = log.split(":")[0];

    // Did the program finish executing?
    if (logStart.match(/^Program (.*) success/g) !== null) {
      return [null, true];
      // Recursive call.
    } else if (
      logStart.startsWith(`Program ${this.programId.toString()} invoke`)
    ) {
      return [this.programId.toString(), false];
    }
    // CPI call.
    else if (logStart.includes("invoke")) {
      return ["cpi", false]; // Any string will do.
    } else {
      return [null, false];
    }
  }
}

// Stack frame execution context, allowing one to track what program is
// executing for a given log.
class ExecutionContext {
  stack: string[] = [];

  program(): string {
    assert.ok(this.stack.length > 0);
    return this.stack[this.stack.length - 1];
  }

  push(newProgram: string) {
    this.stack.push(newProgram);
  }

  pop() {
    assert.ok(this.stack.length > 0);
    this.stack.pop();
  }
}

class LogScanner {
  constructor(public logs: string[]) {}

  next(): string | null {
    if (this.logs.length === 0) {
      return null;
    }
    let l = this.logs[0];
    this.logs = this.logs.slice(1);
    return l;
  }
}
