import { ethers } from "ethers"
import abi from "./abi-participation-1155.json"
import getDefaultProvider from "./getDefaultProvider"

const balanceOfParticipationRewards = async (address: string) => {
  const provider = getDefaultProvider(137)
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_PARTICIPATION_REWARDS_CONTRACT_ADDRESS,
    abi,
    provider,
  )

  try {
    const response = await contract.balanceOf(address, 1)
    return response
  } catch (err) {
    return { error: err }
  }
}

export default balanceOfParticipationRewards
