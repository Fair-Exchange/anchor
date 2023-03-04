import { Idl, Coder } from "@safely-project/anchor";

import { SafeMemoAccountsCoder } from "./accounts";
import { SafeMemoEventsCoder } from "./events";
import { SafeMemoInstructionCoder } from "./instructions";
import { SafeMemoStateCoder } from "./state";
import { SafeMemoTypesCoder } from "./types";

/**
 * Coder for SafeMemo
 */
export class SafeMemoCoder implements Coder {
  readonly accounts: SafeMemoAccountsCoder;
  readonly events: SafeMemoEventsCoder;
  readonly instruction: SafeMemoInstructionCoder;
  readonly state: SafeMemoStateCoder;
  readonly types: SafeMemoTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new SafeMemoAccountsCoder(idl);
    this.events = new SafeMemoEventsCoder(idl);
    this.instruction = new SafeMemoInstructionCoder(idl);
    this.state = new SafeMemoStateCoder(idl);
    this.types = new SafeMemoTypesCoder(idl);
  }
}
