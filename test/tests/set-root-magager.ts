import { expect } from "chai";
import { Contract } from "ethers";
import { polygonRootChainManager } from "../shared/constants";

export async function shouldSetRootManager(_hydraBridge: Contract) {
  await _hydraBridge.setRootManager(polygonRootChainManager);
  const rootChainManager = await _hydraBridge._polygonRootChainManager();
  expect(rootChainManager).to.equal(polygonRootChainManager);
}
