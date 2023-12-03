import { ethers, Signer } from "ethers"
import friendAndFamilyAbi from "./abi-friend-family.json"
import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"

export const hasDiscount = async (address: string) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
    friendAndFamilyAbi,
    provider,
  )
  try {
    const response = await contract.hasDiscount(address)
    return response
  } catch (err) {
    handleTxError(err)
    return false
  }
}

export const maxClaimedFree = async (address: string) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
    friendAndFamilyAbi,
    provider,
  )
  try {
    const response = await contract.totalClaimed(address)
    return parseInt(response.toString(), 16)
  } catch (err) {
    handleTxError(err)
    return 0
  }
}

export const mintByFriendsAndFamily = async (signer: Signer, onSuccess: any) => {
  const address = await signer.getAddress()

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
    friendAndFamilyAbi,
    signer,
  )

  try {
    const tx = await contract.mint(address)
    const receipt = await tx.wait()
    await onSuccess?.()
    return receipt
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}
