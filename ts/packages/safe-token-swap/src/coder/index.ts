import { Idl, Coder } from "@safely-project/anchor";

import { SafeTokenSwapAccountsCoder } from "./accounts";
import { SafeTokenSwapEventsCoder } from "./events";
import { SafeTokenSwapInstructionCoder } from "./instructions";
import { SafeTokenSwapStateCoder } from "./state";
import { SafeTokenSwapTypesCoder } from "./types";

/**
 * Coder for SafeTokenSwap
 */
export class SafeTokenSwapCoder implements Coder {
  readonly accounts: SafeTokenSwapAccountsCoder;
  readonly events: SafeTokenSwapEventsCoder;
  readonly instruction: SafeTokenSwapInstructionCoder;
  readonly state: SafeTokenSwapStateCoder;
  readonly types: SafeTokenSwapTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new SafeTokenSwapAccountsCoder(idl);
    this.events = new SafeTokenSwapEventsCoder(idl);
    this.instruction = new SafeTokenSwapInstructionCoder(idl);
    this.state = new SafeTokenSwapStateCoder(idl);
    this.types = new SafeTokenSwapTypesCoder(idl);
  }
}
