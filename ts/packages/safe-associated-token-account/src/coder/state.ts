import { Idl, StateCoder } from "@safely-project/anchor";

export class SafeAssociatedTokenAccountStateCoder implements StateCoder {
  constructor(_idl: Idl) {}

  encode<T = any>(_name: string, _account: T): Promise<Buffer> {
    throw new Error("SafeAssociatedTokenAccount does not have state");
  }
  decode<T = any>(_ix: Buffer): T {
    throw new Error("SafeAssociatedTokenAccount does not have state");
  }
}
