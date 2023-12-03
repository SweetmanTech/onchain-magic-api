import axios from "axios"
import getRpcUrl from "../getRpcUrl"

const ethBlockNumber = async (chainId) => {
  const endpoint = getRpcUrl(chainId)

  const latestBlockNumberResponse = await axios.post(endpoint, {
    id: 0,
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
  })
  const latestBlock = parseInt(latestBlockNumberResponse.data.result, 16)
  return latestBlock
}

export default ethBlockNumber
