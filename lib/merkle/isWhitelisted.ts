import { getAddress } from "ethers/lib/utils.js"
import axios from "axios"
import { getWhitelistedUsers } from "./getWhitelistedUsers"

export const isWhitelisted = (address: string) =>
  address
    ? Boolean(getWhitelistedUsers().find((user) => user.minter === getAddress(address)))
    : false

export const hasMerkleProof = async (address: string, root: string) => {
  const params = {
    root,
    walletAddress: address,
  }
  const result = await axios.get("/api/v2/get/merkle", { params })
  return result.data.success
}
