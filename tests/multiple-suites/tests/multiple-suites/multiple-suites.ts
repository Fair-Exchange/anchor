import * as anchor from "@safely-project/anchor";
import { Program } from "@safely-project/anchor";
import { PublicKey } from "@safecoin/web3.js";
import { assert } from "chai";
import { MultipleSuites } from "../../target/types/multiple_suites";

describe("multiple-suites", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.MultipleSuites as Program<MultipleSuites>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.initialize(new anchor.BN(2394832), {});

    // SOME_TOKEN.json should NOT exist.
    const SOME_TOKEN = await program.provider.connection.getAccountInfo(
      new PublicKey("C4XeBpzX4tDjGV1gkLsj7jJh6XHunVqAykANWCfTLszw")
    );

    // SOME_ACCOUNT.json should exist.
    const SOME_ACCOUNT = await program.provider.connection.getAccountInfo(
      new PublicKey("3vMPj13emX9JmifYcWc77ekEzV1F37ga36E1YeSr6Mdj")
    );

    assert.isNull(SOME_TOKEN);
    assert.isNotNull(SOME_ACCOUNT);

    console.log("Your transaction signature", tx);
  });
});
