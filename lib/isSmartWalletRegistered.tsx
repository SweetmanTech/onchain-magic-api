import getDefaultProvider from "./getDefaultProvider"
import getSmartWallet from "./getSmartWallet"

const isSmartWalletRegistered = async (tokenId) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const smartWalletAddress = await getSmartWallet(tokenId)
  const code = await provider.getCode(smartWalletAddress)
  const hasTokenboundAccount = code !== "0x"
  return hasTokenboundAccount
}

export default isSmartWalletRegistered
