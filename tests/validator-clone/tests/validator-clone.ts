import * as anchor from "@safely-project/anchor";
import { Program } from "@safely-project/anchor";
import { assert } from "chai";
import { ValidatorClone } from "../target/types/validator_clone";

describe("validator-clone", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.ValidatorClone as Program<ValidatorClone>;
  const connection = program.provider.connection;

  it("Cloned non-executable account", async () => {
    // Metadata program upgrade authority
    const account = "AqH29mZfQFgRpfwaPoTMWSKJ5kqauoc1FwVBRksZyQrt";
    const [accountInfo] = await anchor.utils.rpc.getMultipleAccounts(
      connection,
      [new anchor.web3.PublicKey(account)]
    );
    assert.isNotNull(accountInfo, "Account " + account + " not found");
  });

  it("Cloned bpf2-program account", async () => {
    // Memo program
    const account = "MEMWKbqsjEB8o972BvDHExZFSauzGZKvB4xHDVPFowh";
    const [accountInfo] = await anchor.utils.rpc.getMultipleAccounts(
      connection,
      [new anchor.web3.PublicKey(account)]
    );
    assert.isNotNull(accountInfo, "Account " + account + " not found");
  });

  it("Cloned bpf3-program accounts and their program data", async () => {
    const accounts = [
      // Metadata program
      "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
      // Metadata program executable data
      "PwDiXFxQsGra4sFFTT8r1QWRMd4vfumiWC1jfWNfdYT",
      // Safeend program
      "So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo",
      // Safeend program executable data
      "DMCvGv1fS5rMcAvEDPDDBawPqbDRSzJh2Bo6qXCmgJkR",
    ];
    const accountInfos = await anchor.utils.rpc.getMultipleAccounts(
      connection,
      accounts.map((acc) => new anchor.web3.PublicKey(acc))
    );

    accountInfos.forEach((acc, i) => {
      assert.isNotNull(acc, "Account " + accounts[i] + " not found");
    });
  });

  it("Cloned bpf3-program account and its program data (both explicitly declared)", async () => {
    const accounts = [
      // Mango v3 program
      "mv3ekLzLbnVPNxjSKvqBpU3ZeZXPQdEC3bp5MDEBG68",
      // Mango v3 program executable data
      "8DKwAVrCEVStDYNPCsmxHtUj8LH9oXNtkVRrBfpNKvhp",
    ];
    const accountInfos = await anchor.utils.rpc.getMultipleAccounts(
      connection,
      accounts.map((acc) => new anchor.web3.PublicKey(acc))
    );

    accountInfos.forEach((acc, i) => {
      assert.isNotNull(acc, "Account " + accounts[i] + " not found");
    });
  });
});
