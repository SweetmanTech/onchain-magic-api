import { ethers } from "ethers"
import minterUtilitiesAbi from "./abi-minter-utilities.json"
import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"

export const getQuantityLeft = async (address: string) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_MINTER_UTILITY,
    minterUtilitiesAbi,
    provider,
  )

  try {
    const quantityLeftAmount = await contract.quantityLeft(
      process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
      process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
      process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
      address,
    )

    return quantityLeftAmount
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}
