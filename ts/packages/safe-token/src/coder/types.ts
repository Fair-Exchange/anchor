import { Idl, TypesCoder } from "@safely-project/anchor";

export class SafeTokenTypesCoder implements TypesCoder {
  constructor(_idl: Idl) {}

  encode<T = any>(_name: string, _type: T): Buffer {
    throw new Error("SafeToken does not have user-defined types");
  }
  decode<T = any>(_name: string, _typeData: Buffer): T {
    throw new Error("SafeToken does not have user-defined types");
  }
}
