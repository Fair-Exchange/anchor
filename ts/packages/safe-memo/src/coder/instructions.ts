// @ts-nocheck
import { Idl, InstructionCoder } from "@safely-project/anchor";

export class SafeMemoInstructionCoder implements InstructionCoder {
  constructor(_idl: Idl) {}

  encode(ixName: string, ix: any): Buffer {
    switch (ixName) {
      case "addMemo": {
        return encodeAddMemo(ix);
      }

      default: {
        throw new Error(`Invalid instruction: ${ixName}`);
      }
    }
  }

  encodeState(_ixName: string, _ix: any): Buffer {
    throw new Error("SafeMemo does not have state");
  }
}

function encodeAddMemo({ memo }: any): Buffer {
  return Buffer.from(memo);
}
