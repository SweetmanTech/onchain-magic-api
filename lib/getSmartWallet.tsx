import { Contract } from "ethers"
import registryAbi from "./abi-ERC6551-registry.json"
import getDefaultProvider from "./getDefaultProvider"

const REGISTRY_ADDRESS = "0x02101dfB77FDE026414827Fdc604ddAF224F0921"
const ACCOUNT_IMPLEMENTATION = "0x2d25602551487c3f3354dd80d76d54383a243358"
const CHAIN_ID = process.env.NEXT_PUBLIC_TESTNET ? 5 : 1
const SALT = 0

const getSmartWallet = async (cre8orNumber) => {
  const registryContract = new Contract(REGISTRY_ADDRESS, registryAbi, getDefaultProvider(CHAIN_ID))
  const tokenBoundAccount = await registryContract.account(
    ACCOUNT_IMPLEMENTATION,
    CHAIN_ID,
    process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
    cre8orNumber,
    SALT,
  )

  return tokenBoundAccount
}

export default getSmartWallet
