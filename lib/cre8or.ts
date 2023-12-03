/* eslint-disable no-plusplus */
import getNFTs from "./alchemy/getNFTs"
import { getIsLocked } from "./lockup"

export const getCre8ors = async (address: string) => {
  const res = await getNFTs(
    address,
    process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
    process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
  )
  return res?.ownedNfts
}

export const getLockedCount = async (address: string) => {
  const response = await getCre8ors(address)
  let count: number = 0
  for (let i = 0; i < response.length; i++) {
    if (response[i]?.id?.tokenId) {
      // eslint-disable-next-line no-await-in-loop
      const isLocked = await getIsLocked(response[i]?.id?.tokenId)
      if (isLocked) count++
    }
  }

  return count
}
