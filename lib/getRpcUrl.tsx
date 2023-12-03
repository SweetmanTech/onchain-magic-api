import { zora } from "@wagmi/core/chains"
import getAlchemyBaseUrl from "./alchemy/getAlchemyBaseUrl"

const getRpcUrl = (chainId) => {
  if (chainId === zora.id) {
    return "https://rpc.zora.energy"
  }
  return `${getAlchemyBaseUrl(chainId)}v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
}

export default getRpcUrl
