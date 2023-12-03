import { ethers } from "ethers"
import { zora } from "@wagmi/core/chains"
import getAlchemyBaseUrl from "./alchemy/getAlchemyBaseUrl"

const ZORA = "https://rpc.zora.energy/"

const getDefaultProvider = (chainId: number) => {
  const base = getAlchemyBaseUrl(chainId)
  const rpc = chainId === zora.id ? ZORA : `${base}v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  return ethers.getDefaultProvider(rpc)
}

export default getDefaultProvider
