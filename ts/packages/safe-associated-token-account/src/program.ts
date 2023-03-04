import { PublicKey } from "@safecoin/web3.js";
import { Program, AnchorProvider } from "@safely-project/anchor";

import { SafeAssociatedTokenAccountCoder } from "./coder";

export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  "AToD9iqHSc2fhEP9Jp7UYA6mRjHQ4CTWyzCsw8X3tH7K"
);

interface GetProgramParams {
  programId?: PublicKey;
  provider?: AnchorProvider;
}

export function splAssociatedTokenAccountProgram(
  params?: GetProgramParams
): Program<SafeAssociatedTokenAccount> {
  return new Program<SafeAssociatedTokenAccount>(
    IDL,
    params?.programId ?? SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    params?.provider,
    new SafeAssociatedTokenAccountCoder(IDL)
  );
}

type SafeAssociatedTokenAccount = {
  version: "1.1.1";
  name: "safe_associated_token_account";
  instructions: [
    {
      name: "create";
      accounts: [
        {
          name: "fundingAddress";
          isMut: true;
          isSigner: true;
        },
        {
          name: "associatedAccountAddress";
          isMut: true;
          isSigner: false;
        },
        {
          name: "walletAddress";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenMintAddress";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "createIdempotent";
      accounts: [
        {
          name: "fundingAddress";
          isMut: true;
          isSigner: true;
        },
        {
          name: "associatedAccountAddress";
          isMut: true;
          isSigner: false;
        },
        {
          name: "walletAddress";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenMintAddress";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "recoverNested";
      accounts: [
        {
          name: "nestedAssociatedAccountAddress";
          isMut: true;
          isSigner: false;
        },
        {
          name: "nestedTokenMintAddress";
          isMut: false;
          isSigner: false;
        },
        {
          name: "destinationAssociatedAccountAddress";
          isMut: true;
          isSigner: false;
        },
        {
          name: "ownerAssociatedAccountAddress";
          isMut: false;
          isSigner: false;
        },
        {
          name: "ownerTokenMintAddress";
          isMut: false;
          isSigner: false;
        },
        {
          name: "walletAddress";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  errors: [
    {
      code: 0;
      name: "InvalidOwner";
      msg: "Associated token account owner does not match address derivation";
    }
  ];
};

const IDL: SafeAssociatedTokenAccount = {
  version: "1.1.1",
  name: "safe_associated_token_account",
  instructions: [
    {
      name: "create",
      accounts: [
        {
          name: "fundingAddress",
          isMut: true,
          isSigner: true,
        },
        {
          name: "associatedAccountAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "walletAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenMintAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createIdempotent",
      accounts: [
        {
          name: "fundingAddress",
          isMut: true,
          isSigner: true,
        },
        {
          name: "associatedAccountAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "walletAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenMintAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "recoverNested",
      accounts: [
        {
          name: "nestedAssociatedAccountAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "nestedTokenMintAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "destinationAssociatedAccountAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "ownerAssociatedAccountAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "ownerTokenMintAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "walletAddress",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  errors: [
    {
      code: 0,
      name: "InvalidOwner",
      msg: "Associated token account owner does not match address derivation",
    },
  ],
};
