import axios from "axios"

const getOwnersForCollection = async () => {
  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const { data } = await axios.get(
    `https://polygon-mainnet.g.alchemy.com/nft/v2/${alchemyKey}/getOwnersForCollection`,
    {
      params: {
        contractAddress: process.env.NEXT_PUBLIC_PARTICIPATION_REWARDS_CONTRACT_ADDRESS,
        withTokenBalances: true,
      },
    },
  )
  return data
}

export default getOwnersForCollection
