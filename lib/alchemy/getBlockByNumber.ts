import axios from "axios"

const getBlockByNumber = async (blockHex: string) => {
  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const url = `https://polygon-mainnet.g.alchemy.com/v2/${alchemyKey}`
  const requestData = {
    id: 1,
    jsonrpc: "2.0",
    method: "eth_getBlockByNumber",
    params: [blockHex, false],
  }
  const { data } = await axios.post(url, requestData)
  return data.result
}

export default getBlockByNumber
