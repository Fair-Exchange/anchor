import { Idl, Coder } from "@safely-project/anchor";

import { SafeTokenAccountsCoder } from "./accounts";
import { SafeTokenEventsCoder } from "./events";
import { SafeTokenInstructionCoder } from "./instructions";
import { SafeTokenStateCoder } from "./state";
import { SafeTokenTypesCoder } from "./types";

/**
 * Coder for SafeToken
 */
export class SafeTokenCoder implements Coder {
  readonly accounts: SafeTokenAccountsCoder;
  readonly events: SafeTokenEventsCoder;
  readonly instruction: SafeTokenInstructionCoder;
  readonly state: SafeTokenStateCoder;
  readonly types: SafeTokenTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new SafeTokenAccountsCoder(idl);
    this.events = new SafeTokenEventsCoder(idl);
    this.instruction = new SafeTokenInstructionCoder(idl);
    this.state = new SafeTokenStateCoder(idl);
    this.types = new SafeTokenTypesCoder(idl);
  }
}
