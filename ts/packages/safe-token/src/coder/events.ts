import { Idl, Event, EventCoder } from "@safely-project/anchor";
import { IdlEvent } from "@safely-project/anchor/dist/cjs/idl";

export class SafeTokenEventsCoder implements EventCoder {
  constructor(_idl: Idl) {}

  decode<E extends IdlEvent = IdlEvent, T = Record<string, string>>(
    _log: string
  ): Event<E, T> | null {
    throw new Error("SafeToken program does not have events");
  }
}
