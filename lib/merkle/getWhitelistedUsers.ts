import { getAddress, isAddress, parseEther } from "ethers/lib/utils.js"
import whitelist from "./response.json"

export const getWhitelistedUsers = () => {
  const maxCount = 8
  const price = parseEther("0.15")

  return whitelist
    .filter(isAddress) // Filter out invalid addresses
    .map((address) => ({
      minter: getAddress(address),
      maxCount,
      price,
    }))
}
