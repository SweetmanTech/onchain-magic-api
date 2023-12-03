import getNFTs from "./alchemy/getNFTs"

export const getPassports = async (address: string) => {
  const res = await getNFTs(
    address,
    process.env.NEXT_PUBLIC_CLAIM_PASSPORT_ADDRESS,
    process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
  )
  return res?.ownedNfts
}

export const getPassportIds = async (address: string) => {
  const response = await getPassports(address)

  return response
}
