import axios from "axios"

const getAssetTransfers = async (toAddress: string) => {
  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const url = `https://polygon-mainnet.g.alchemy.com/v2/${alchemyKey}`
  const requestData = {
    id: 1,
    jsonrpc: "2.0",
    method: "alchemy_getAssetTransfers",
    params: [
      {
        toAddress,
        contractAddresses: [process.env.NEXT_PUBLIC_PARTICIPATION_REWARDS_CONTRACT_ADDRESS],
        category: ["erc1155"],
        excludeZeroValue: true,
      },
    ],
  }
  const { data } = await axios.post(url, requestData)
  return data.result.transfers
}

export default getAssetTransfers
