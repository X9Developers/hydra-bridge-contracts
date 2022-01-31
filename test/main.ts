import chai from "chai";
import { solidity } from "ethereum-waffle";
import { shouldApproveContract } from "./tests/approve-contract";
import { shouldSendEthPolygon } from "./tests/send-eth-polygon";
import { shouldSetErc20Predicate } from "./tests/set-erc20-predicate";
import { shouldSetHopBridgeEth } from "./tests/set-hop-bridge-eth";
import { shouldSetRootManager } from "./tests/set-root-magager";
import {
  deployErc20,
  deployHopBridgeErc20,
  deployHopBridgeEth,
  deployHydraBridge,
  deployRootManager,
} from "./shared/deployers";
import { shouldSendTokenPolygon } from "./tests/send-token-polygon";
import { shouldSendTokenHop } from "./tests/send-token-to-hop";
import { shouldSendEthToHop } from "./tests/send-eth-to-hop";
import { shouldPause } from "./tests/should-pause";
import { shouldPauseUnpauseSend } from "./tests/shold-pause-unpause-send";
import { shouldRescueFunds } from "./tests/should-rescue-funds";
import { shouldSetHopBridgeErc20 } from "./tests/set-hop-bridge-erc20";
import { Contract } from "ethers";

chai.use(solidity);

describe("Run all tests", function () {
  let erc20, hydraBridge: Contract, rootManager, hopBridgeEth, hopBridgeErc20;
  before(async function () {
    erc20 = await deployErc20();
    rootManager = await deployRootManager();
    hopBridgeEth = await deployHopBridgeEth();
    hopBridgeErc20 = await deployHopBridgeErc20();
    hydraBridge = await deployHydraBridge(
      erc20.address,
      rootManager.address,
      hopBridgeEth.address,
      hopBridgeErc20.address
    );
  });

  describe("HydraBridge erc20 predicate address setting", function () {
    it("Should set erc20 predicate address", async () => {
      await shouldSetErc20Predicate(hydraBridge);
    });
  });

  describe("HydraBridge hop bridge eth address setting", function () {
    it("Should set hop bridge eth address", async () => {
      await shouldSetHopBridgeEth(hydraBridge);
    });
  });

  describe("HydraBridge hop bridge erc20 address setting", function () {
    it("Should set hop bridge erc20 address", async () => {
      await shouldSetHopBridgeErc20(hydraBridge);
    });
  });

  describe("HydraBridge root manager address setting", function () {
    it("Should set root manager", async () => {
      await shouldSetRootManager(hydraBridge);
    });
  });

  describe("HydraBridge send eth to polygon bridge", function () {
    it("Should send right amount of eth to polygon bridge", async () => {
      await shouldSendEthPolygon();
    });
  });

  describe("HydraBridge should approve contract", function () {
    it("Should approve contract", async () => {
      await shouldApproveContract();
    });
  });

  describe("HydraBridge should approve contract and send to polygon bridge", function () {
    it("Should approve contract and send right amount to polygon bridge", async () => {
      await shouldSendTokenPolygon();
    });
  });

  describe("HydraBridge should approve contract and send token to hop bridge", function () {
    it("Should approve contract and send right amount of tokens to hop bridge", async () => {
      await shouldSendTokenHop();
    });
  });

  describe("HydraBridge send eth to hop bridge", function () {
    it("Should send right amount of eth to hop bridge", async () => {
      await shouldSendEthToHop();
    });
  });

  describe("HydraBridge paused", function () {
    it("Should pause and not let using method", async () => {
      await shouldPause();
    });
  });

  describe("HydraBridge paused, unpaused", function () {
    it("Should pause, then unpause and send tokens", async () => {
      await shouldPauseUnpauseSend();
    });
  });

  describe("HydraBridge rescue", function () {
    it("Should rescue funds", async () => {
      await shouldRescueFunds();
    });
  });
});
