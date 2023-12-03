import { BigNumber, utils } from "ethers"
import getStorageAt from "./alchemy/getStorageAt"

const ERC1967_IMPLEMENTATION_SLOT =
  "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
const NULL_DATA = "0x0000000000000000000000000000000000000000000000000000000000000000"

const getImplementationAddress = async (proxyAddress) => {
  const data = await getStorageAt(proxyAddress, ERC1967_IMPLEMENTATION_SLOT)
  const missingImplementation = data === NULL_DATA
  return missingImplementation ? false : utils.getAddress(BigNumber.from(data).toHexString())
}

export default getImplementationAddress
