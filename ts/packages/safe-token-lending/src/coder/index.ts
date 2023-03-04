import { Idl, Coder } from "@safely-project/anchor";

import { SafeTokenLendingAccountsCoder } from "./accounts";
import { SafeTokenLendingEventsCoder } from "./events";
import { SafeTokenLendingInstructionCoder } from "./instructions";
import { SafeTokenLendingStateCoder } from "./state";
import { SafeTokenLendingTypesCoder } from "./types";

/**
 * Coder for SafeTokenLending
 */
export class SafeTokenLendingCoder implements Coder {
  readonly accounts: SafeTokenLendingAccountsCoder;
  readonly events: SafeTokenLendingEventsCoder;
  readonly instruction: SafeTokenLendingInstructionCoder;
  readonly state: SafeTokenLendingStateCoder;
  readonly types: SafeTokenLendingTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new SafeTokenLendingAccountsCoder(idl);
    this.events = new SafeTokenLendingEventsCoder(idl);
    this.instruction = new SafeTokenLendingInstructionCoder(idl);
    this.state = new SafeTokenLendingStateCoder(idl);
    this.types = new SafeTokenLendingTypesCoder(idl);
  }
}
