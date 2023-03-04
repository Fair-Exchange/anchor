import { PublicKey } from "@safecoin/web3.js";
import { Program, AnchorProvider } from "@safely-project/anchor";

import { SafeMemoCoder } from "./coder";

export const SPL_MEMO_PROGRAM_ID = new PublicKey(
  "MEMDqRW2fYAU19mcFnoDVoqG4Br4t7TdyWjjv38P6Nc"
);

interface GetProgramParams {
  programId?: PublicKey;
  provider?: AnchorProvider;
}

export function splMemoProgram(params?: GetProgramParams): Program<SafeMemo> {
  return new Program<SafeMemo>(
    IDL,
    params?.programId ?? SPL_MEMO_PROGRAM_ID,
    params?.provider,
    new SafeMemoCoder(IDL)
  );
}

type SafeMemo = {
  version: "3.0.1";
  name: "safe_memo";
  instructions: [
    {
      name: "addMemo";
      accounts: [];
      args: [
        {
          name: "memo";
          type: "string";
        }
      ];
    }
  ];
};

const IDL: SafeMemo = {
  version: "3.0.1",
  name: "safe_memo",
  instructions: [
    {
      name: "addMemo",
      accounts: [],
      args: [
        {
          name: "memo",
          type: "string",
        },
      ],
    },
  ],
};
