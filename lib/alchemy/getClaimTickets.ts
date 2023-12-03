import getNFTs from "./getNFTs"

export const getClaimTickets = async (address: string) => {
  const res = await getNFTs(
    address,
    process.env.NEXT_PUBLIC_CRE8ORS_CLAIM_TICKET_ADDRESS,
    process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
  )
  return res?.ownedNfts
}
export const getLatestClaimTicket = async (address: string) => {
  const response = await getClaimTickets(address)
  const count = response?.length
  const latestClaimTicket = response?.pop() || null
  return { ticket: latestClaimTicket, noOfTickets: count }
}
