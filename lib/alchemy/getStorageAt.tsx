import axios from "axios"
import getAlchemyBaseUrl from "./getAlchemyBaseUrl"

const getStorageAt = async (smartWalletAddress: string, index: any, blockTag = "latest") => {
  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const chainId = process.env.NEXT_PUBLIC_TESTNET ? 5 : 1
  const url = `${getAlchemyBaseUrl(chainId)}v2/${alchemyKey}`

  const requestData = {
    id: 0,
    jsonrpc: "2.0",
    method: "eth_getStorageAt",
    params: [smartWalletAddress, index, blockTag],
  }
  const { data } = await axios.post(url, requestData)
  return data.result
}

export default getStorageAt
