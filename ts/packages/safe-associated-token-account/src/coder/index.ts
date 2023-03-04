import { Idl, Coder } from "@safely-project/anchor";

import { SafeAssociatedTokenAccountAccountsCoder } from "./accounts";
import { SafeAssociatedTokenAccountEventsCoder } from "./events";
import { SafeAssociatedTokenAccountInstructionCoder } from "./instructions";
import { SafeAssociatedTokenAccountStateCoder } from "./state";
import { SafeAssociatedTokenAccountTypesCoder } from "./types";

/**
 * Coder for SafeAssociatedTokenAccount
 */
export class SafeAssociatedTokenAccountCoder implements Coder {
  readonly accounts: SafeAssociatedTokenAccountAccountsCoder;
  readonly events: SafeAssociatedTokenAccountEventsCoder;
  readonly instruction: SafeAssociatedTokenAccountInstructionCoder;
  readonly state: SafeAssociatedTokenAccountStateCoder;
  readonly types: SafeAssociatedTokenAccountTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new SafeAssociatedTokenAccountAccountsCoder(idl);
    this.events = new SafeAssociatedTokenAccountEventsCoder(idl);
    this.instruction = new SafeAssociatedTokenAccountInstructionCoder(idl);
    this.state = new SafeAssociatedTokenAccountStateCoder(idl);
    this.types = new SafeAssociatedTokenAccountTypesCoder(idl);
  }
}
