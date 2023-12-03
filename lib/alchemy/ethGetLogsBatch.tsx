import axios from "axios"
import getAlchemyRpcUrl from "./getAlchemyRpcUrl"

export const ethGetLogsBatch = async (chainId, requests) => {
  const endpoint = getAlchemyRpcUrl(chainId)

  const batchPayload = requests.map((req, index) => ({
    id: index,
    jsonrpc: "2.0",
    method: "eth_getLogs",
    params: [
      {
        fromBlock: req.fromBlock || "0x1",
        toBlock: req.toBlock || "latest",
        address: req.contractAddress,
        topics: req.topics,
      },
    ],
  }))

  try {
    const response = await axios.post(endpoint, batchPayload)
    const batchedLogs = response.data
    const mapped = batchedLogs.map((res) => res.result)
    return mapped.flat()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching logs in batch:", error)
    return []
  }
}
