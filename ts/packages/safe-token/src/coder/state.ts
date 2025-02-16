import { Idl, StateCoder } from "@safely-project/anchor";

export class SafeTokenStateCoder implements StateCoder {
  constructor(_idl: Idl) {}

  encode<T = any>(_name: string, _account: T): Promise<Buffer> {
    throw new Error("SafeToken does not have state");
  }
  decode<T = any>(_ix: Buffer): T {
    throw new Error("SafeToken does not have state");
  }
}
