/* eslint-disable */
import axios from "axios"
import getAlchemyBaseUrl from "./getAlchemyBaseUrl"

const getNFTs = async (address: string, contractAddress: string, chainId: number = 5) => {
  let nfts = []
  let pageKey = null
  let totalCount = 0

  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const optionalContractParam = contractAddress ? `&contractAddresses%5B%5D=${contractAddress}` : ""

  while (1) {
    try {
      const { data } = await axios.get(
        `${getAlchemyBaseUrl(
          chainId,
        )}nft/v2/${alchemyKey}/getNFTs?owner=${address}${optionalContractParam}${
          pageKey ? `&pageKey=${pageKey}` : ""
        }`,
      )

      if (data.ownedNfts.length) nfts = nfts.concat(data.ownedNfts)
      if (data.totalCount) totalCount = data.totalCount

      if (!data.pageKey) break
      pageKey = data.pageKey
    } catch (err) {
      break
    }
  }

  return {
    ownedNfts: nfts,
    totalCount,
  }
}

export default getNFTs
