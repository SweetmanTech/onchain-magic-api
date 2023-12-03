import { defaultAbiCoder, getAddress } from "ethers/lib/utils.js"
import keccak256 from "keccak256"

const hashMerkleEntry = (entry) => {
  const { minter, maxCount, price } = entry
  return keccak256(
    defaultAbiCoder.encode(
      ["address", "uint256", "uint256"],
      [getAddress(minter), maxCount, price],
    ),
  )
}

export default hashMerkleEntry
