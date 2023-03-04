import { PublicKey } from "@safecoin/web3.js";

export const TOKEN_PROGRAM_ID = new PublicKey(
  "ToKLx75MGim1d1jRusuVX8xvdvvbSDESVaNXpRA9PHN"
);
export const ASSOCIATED_PROGRAM_ID = new PublicKey(
  "AToD9iqHSc2fhEP9Jp7UYA6mRjHQ4CTWyzCsw8X3tH7K"
);

export function associatedAddress({
  mint,
  owner,
}: {
  mint: PublicKey;
  owner: PublicKey;
}): PublicKey {
  return PublicKey.findProgramAddressSync(
    [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    ASSOCIATED_PROGRAM_ID
  )[0];
}
