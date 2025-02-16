import { PublicKey } from "@safecoin/web3.js";
import { Program, AnchorProvider } from "@safely-project/anchor";

import { SafeTokenSwapCoder } from "./coder";

export const SAFE_TOKEN_SWAP_PROGRAM_ID = new PublicKey(
  "SwapsVeCiPHMUAtzQWZw7RjsKjgCjhwU55QGu4U1Szw"
);

interface GetProgramParams {
  programId?: PublicKey;
  provider?: AnchorProvider;
}

export function splTokenSwapProgram(
  params?: GetProgramParams
): Program<SafeTokenSwap> {
  return new Program<SafeTokenSwap>(
    IDL,
    params?.programId ?? SAFE_TOKEN_SWAP_PROGRAM_ID,
    params?.provider,
    new SafeTokenSwapCoder(IDL)
  );
}

type SafeTokenSwap = {
  version: "3.0.0";
  name: "safe_token_swap";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "swap";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenA";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenB";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "fee";
          isMut: false;
          isSigner: false;
        },
        {
          name: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "fees";
          type: {
            defined: "Fees";
          };
        },
        {
          name: "swapCurve";
          type: {
            defined: "SwapCurve";
          };
        }
      ];
    },
    {
      name: "swap";
      accounts: [
        {
          name: "swap";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTransferAuthority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "source";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapSource";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapDestination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolFee";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amountIn";
          type: "u64";
        },
        {
          name: "minimumAmountOut";
          type: "u64";
        }
      ];
    },
    {
      name: "depositAllTokenTypes";
      accounts: [
        {
          name: "swap";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTransferAuthority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "depositTokenA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "depositTokenB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapTokenA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapTokenB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "poolTokenAmount";
          type: "u64";
        },
        {
          name: "maximumTokenAAmount";
          type: "u64";
        },
        {
          name: "maximumTokenBAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "withdrawAllTokenTypes";
      accounts: [
        {
          name: "swap";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTransferAuthority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "poolMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "source";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapTokenA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapTokenB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destinationTokenA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destinationTokenB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "poolTokenAmount";
          type: "u64";
        },
        {
          name: "minimumTokenAAmount";
          type: "u64";
        },
        {
          name: "minimumTokenBAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "depositSingleTokenTypeExactAmountIn";
      accounts: [
        {
          name: "swap";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTransferAuthority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "sourceToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapTokenA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapTokenB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "sourceTokenAmount";
          type: "u64";
        },
        {
          name: "minimumPoolTokenAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "withdrawSingleTokenTypeExactAmountOut";
      accounts: [
        {
          name: "swap";
          isMut: false;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "userTransferAuthority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "poolMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "poolTokenSource";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapTokenA";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapTokenB";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "destinationTokenAmount";
          type: "u64";
        },
        {
          name: "maximumPoolTokenAmount";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "swap";
      type: {
        kind: "struct";
        fields: [
          {
            name: "version";
            type: "u8";
          },
          {
            name: "isInitialized";
            type: "bool";
          },
          {
            name: "bumpSeed";
            type: "u8";
          },
          {
            name: "tokenProgramId";
            type: "publicKey";
          },
          {
            name: "tokenA";
            type: "publicKey";
          },
          {
            name: "tokenB";
            type: "publicKey";
          },
          {
            name: "poolMint";
            type: "publicKey";
          },
          {
            name: "tokenAMint";
            type: "publicKey";
          },
          {
            name: "tokenBMint";
            type: "publicKey";
          },
          {
            name: "poolFeeAccount";
            type: "publicKey";
          },
          {
            name: "fees";
            type: {
              defined: "Fees";
            };
          },
          {
            name: "swapCurve";
            type: {
              defined: "SwapCurve";
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "Fees";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tradeFeeNumerator";
            type: "u64";
          },
          {
            name: "tradeFeeDenominator";
            type: "u64";
          },
          {
            name: "ownerTradeFeeNumerator";
            type: "u64";
          },
          {
            name: "ownerTradeFeeDenominator";
            type: "u64";
          },
          {
            name: "ownerWithdrawFeeNumerator";
            type: "u64";
          },
          {
            name: "ownerWithdrawFeeDenominator";
            type: "u64";
          },
          {
            name: "hostFeeNumerator";
            type: "u64";
          },
          {
            name: "hostFeeDenominator";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "SwapCurve";
      type: {
        kind: "struct";
        fields: [
          {
            name: "curveType";
            type: {
              defined: "CurveType";
            };
          },
          {
            name: "calculator";
            type: {
              array: ["u8", 32];
            };
          }
        ];
      };
    },
    {
      name: "StableCurve";
      type: {
        kind: "struct";
        fields: [
          {
            name: "amp";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "OffsetCurve";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tokenBOffset";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "ConstantProductCurve";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "ConstantPriceCurve";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tokenBPrice";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "CurveType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "ConstantProduct";
          },
          {
            name: "ConstantPrice";
          },
          {
            name: "Stable";
          },
          {
            name: "Offset";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 0;
      name: "AlreadyInUse";
      msg: "Swap account already in use";
    },
    {
      code: 1;
      name: "InvalidProgramAddress";
      msg: "Invalid program address generated from bump seed and key";
    },
    {
      code: 2;
      name: "InvalidOwner";
      msg: "Input account owner is not the program address";
    },
    {
      code: 3;
      name: "InvalidOutputOwner";
      msg: "Output pool account owner cannot be the program address";
    },
    {
      code: 4;
      name: "ExpectedMint";
      msg: "Deserialized account is not an SPL Token mint";
    },
    {
      code: 5;
      name: "ExpectedAccount";
      msg: "Deserialized account is not an SPL Token account";
    },
    {
      code: 6;
      name: "EmptySupply";
      msg: "Input token account empty";
    },
    {
      code: 7;
      name: "InvalidSupply";
      msg: "Pool token mint has a non-zero supply";
    },
    {
      code: 8;
      name: "InvalidDelegate";
      msg: "Token account has a delegate";
    },
    {
      code: 9;
      name: "InvalidInput";
      msg: "InvalidInput";
    },
    {
      code: 10;
      name: "IncorrectSwapAccount";
      msg: "Address of the provided swap token account is incorrect";
    },
    {
      code: 11;
      name: "IncorrectPoolMint";
      msg: "Address of the provided pool token mint is incorrect";
    },
    {
      code: 12;
      name: "InvalidOutput";
      msg: "InvalidOutput";
    },
    {
      code: 13;
      name: "CalculationFailure";
      msg: "General calculation failure due to overflow or underflow";
    },
    {
      code: 14;
      name: "InvalidInstruction";
      msg: "Invalid instruction";
    },
    {
      code: 15;
      name: "RepeatedMint";
      msg: "Swap input token accounts have the same mint";
    },
    {
      code: 16;
      name: "ExceededSlippage";
      msg: "Swap instruction exceeds desired slippage limit";
    },
    {
      code: 17;
      name: "InvalidCloseAuthority";
      msg: "Token account has a close authority";
    },
    {
      code: 18;
      name: "InvalidFreezeAuthority";
      msg: "Pool token mint has a freeze authority";
    },
    {
      code: 19;
      name: "IncorrectFeeAccount";
      msg: "Pool fee token account incorrect";
    },
    {
      code: 20;
      name: "ZeroTradingTokens";
      msg: "Given pool token amount results in zero trading tokens";
    },
    {
      code: 21;
      name: "FeeCalculationFailure";
      msg: "Fee calculation failed due to overflow, underflow, or unexpected 0";
    },
    {
      code: 22;
      name: "ConversionFailure";
      msg: "Conversion to u64 failed with an overflow or underflow";
    },
    {
      code: 23;
      name: "InvalidFee";
      msg: "The provided fee does not match the program owner's constraints";
    },
    {
      code: 24;
      name: "IncorrectTokenProgramId";
      msg: "The provided token program does not match the token program expected by the swap";
    },
    {
      code: 25;
      name: "UnsupportedCurveType";
      msg: "The provided curve type is not supported by the program owner";
    },
    {
      code: 26;
      name: "InvalidCurve";
      msg: "The provided curve parameters are invalid";
    },
    {
      code: 27;
      name: "UnsupportedCurveOperation";
      msg: "The operation cannot be performed on the given curve";
    }
  ];
};

const IDL: SafeTokenSwap = {
  version: "3.0.0",
  name: "safe_token_swap",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "swap",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenA",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenB",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "fee",
          isMut: false,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "fees",
          type: {
            defined: "Fees",
          },
        },
        {
          name: "swapCurve",
          type: {
            defined: "SwapCurve",
          },
        },
      ],
    },
    {
      name: "swap",
      accounts: [
        {
          name: "swap",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTransferAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapSource",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapDestination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolFee",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amountIn",
          type: "u64",
        },
        {
          name: "minimumAmountOut",
          type: "u64",
        },
      ],
    },
    {
      name: "depositAllTokenTypes",
      accounts: [
        {
          name: "swap",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTransferAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "depositTokenA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "depositTokenB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapTokenA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapTokenB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "poolTokenAmount",
          type: "u64",
        },
        {
          name: "maximumTokenAAmount",
          type: "u64",
        },
        {
          name: "maximumTokenBAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "withdrawAllTokenTypes",
      accounts: [
        {
          name: "swap",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTransferAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "poolMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapTokenA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapTokenB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destinationTokenA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destinationTokenB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "poolTokenAmount",
          type: "u64",
        },
        {
          name: "minimumTokenAAmount",
          type: "u64",
        },
        {
          name: "minimumTokenBAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "depositSingleTokenTypeExactAmountIn",
      accounts: [
        {
          name: "swap",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTransferAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "sourceToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapTokenA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapTokenB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "sourceTokenAmount",
          type: "u64",
        },
        {
          name: "minimumPoolTokenAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "withdrawSingleTokenTypeExactAmountOut",
      accounts: [
        {
          name: "swap",
          isMut: false,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userTransferAuthority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "poolMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenSource",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapTokenA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapTokenB",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "destinationTokenAmount",
          type: "u64",
        },
        {
          name: "maximumPoolTokenAmount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "swap",
      type: {
        kind: "struct",
        fields: [
          {
            name: "version",
            type: "u8",
          },
          {
            name: "isInitialized",
            type: "bool",
          },
          {
            name: "bumpSeed",
            type: "u8",
          },
          {
            name: "tokenProgramId",
            type: "publicKey",
          },
          {
            name: "tokenA",
            type: "publicKey",
          },
          {
            name: "tokenB",
            type: "publicKey",
          },
          {
            name: "poolMint",
            type: "publicKey",
          },
          {
            name: "tokenAMint",
            type: "publicKey",
          },
          {
            name: "tokenBMint",
            type: "publicKey",
          },
          {
            name: "poolFeeAccount",
            type: "publicKey",
          },
          {
            name: "fees",
            type: {
              defined: "Fees",
            },
          },
          {
            name: "swapCurve",
            type: {
              defined: "SwapCurve",
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "Fees",
      type: {
        kind: "struct",
        fields: [
          {
            name: "tradeFeeNumerator",
            type: "u64",
          },
          {
            name: "tradeFeeDenominator",
            type: "u64",
          },
          {
            name: "ownerTradeFeeNumerator",
            type: "u64",
          },
          {
            name: "ownerTradeFeeDenominator",
            type: "u64",
          },
          {
            name: "ownerWithdrawFeeNumerator",
            type: "u64",
          },
          {
            name: "ownerWithdrawFeeDenominator",
            type: "u64",
          },
          {
            name: "hostFeeNumerator",
            type: "u64",
          },
          {
            name: "hostFeeDenominator",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "SwapCurve",
      type: {
        kind: "struct",
        fields: [
          {
            name: "curveType",
            type: {
              defined: "CurveType",
            },
          },
          {
            name: "calculator",
            type: {
              array: ["u8", 32],
            },
          },
        ],
      },
    },
    {
      name: "StableCurve",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amp",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "OffsetCurve",
      type: {
        kind: "struct",
        fields: [
          {
            name: "tokenBOffset",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "ConstantProductCurve",
      type: {
        kind: "struct",
        fields: [],
      },
    },
    {
      name: "ConstantPriceCurve",
      type: {
        kind: "struct",
        fields: [
          {
            name: "tokenBPrice",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "CurveType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "ConstantProduct",
          },
          {
            name: "ConstantPrice",
          },
          {
            name: "Stable",
          },
          {
            name: "Offset",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 0,
      name: "AlreadyInUse",
      msg: "Swap account already in use",
    },
    {
      code: 1,
      name: "InvalidProgramAddress",
      msg: "Invalid program address generated from bump seed and key",
    },
    {
      code: 2,
      name: "InvalidOwner",
      msg: "Input account owner is not the program address",
    },
    {
      code: 3,
      name: "InvalidOutputOwner",
      msg: "Output pool account owner cannot be the program address",
    },
    {
      code: 4,
      name: "ExpectedMint",
      msg: "Deserialized account is not an SPL Token mint",
    },
    {
      code: 5,
      name: "ExpectedAccount",
      msg: "Deserialized account is not an SPL Token account",
    },
    {
      code: 6,
      name: "EmptySupply",
      msg: "Input token account empty",
    },
    {
      code: 7,
      name: "InvalidSupply",
      msg: "Pool token mint has a non-zero supply",
    },
    {
      code: 8,
      name: "InvalidDelegate",
      msg: "Token account has a delegate",
    },
    {
      code: 9,
      name: "InvalidInput",
      msg: "InvalidInput",
    },
    {
      code: 10,
      name: "IncorrectSwapAccount",
      msg: "Address of the provided swap token account is incorrect",
    },
    {
      code: 11,
      name: "IncorrectPoolMint",
      msg: "Address of the provided pool token mint is incorrect",
    },
    {
      code: 12,
      name: "InvalidOutput",
      msg: "InvalidOutput",
    },
    {
      code: 13,
      name: "CalculationFailure",
      msg: "General calculation failure due to overflow or underflow",
    },
    {
      code: 14,
      name: "InvalidInstruction",
      msg: "Invalid instruction",
    },
    {
      code: 15,
      name: "RepeatedMint",
      msg: "Swap input token accounts have the same mint",
    },
    {
      code: 16,
      name: "ExceededSlippage",
      msg: "Swap instruction exceeds desired slippage limit",
    },
    {
      code: 17,
      name: "InvalidCloseAuthority",
      msg: "Token account has a close authority",
    },
    {
      code: 18,
      name: "InvalidFreezeAuthority",
      msg: "Pool token mint has a freeze authority",
    },
    {
      code: 19,
      name: "IncorrectFeeAccount",
      msg: "Pool fee token account incorrect",
    },
    {
      code: 20,
      name: "ZeroTradingTokens",
      msg: "Given pool token amount results in zero trading tokens",
    },
    {
      code: 21,
      name: "FeeCalculationFailure",
      msg: "Fee calculation failed due to overflow, underflow, or unexpected 0",
    },
    {
      code: 22,
      name: "ConversionFailure",
      msg: "Conversion to u64 failed with an overflow or underflow",
    },
    {
      code: 23,
      name: "InvalidFee",
      msg: "The provided fee does not match the program owner's constraints",
    },
    {
      code: 24,
      name: "IncorrectTokenProgramId",
      msg: "The provided token program does not match the token program expected by the swap",
    },
    {
      code: 25,
      name: "UnsupportedCurveType",
      msg: "The provided curve type is not supported by the program owner",
    },
    {
      code: 26,
      name: "InvalidCurve",
      msg: "The provided curve parameters are invalid",
    },
    {
      code: 27,
      name: "UnsupportedCurveOperation",
      msg: "The operation cannot be performed on the given curve",
    },
  ],
};
