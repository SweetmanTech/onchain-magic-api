import MerkleTree from "merkletreejs"
import keccak256 from "keccak256"
import { hexValue } from "ethers/lib/utils.js"
import hashMerkleEntry from "./hashMerkleEntry"
import { getWhitelistedUsers } from "./getWhitelistedUsers"

const generateMerkleProof = (minter) => {
  let entries = getWhitelistedUsers().map((entry) => {
    const newEntry = entry as any
    newEntry.hash = hashMerkleEntry(entry)
    return newEntry
  })

  const newtree = new MerkleTree(
    entries.map((entry) => entry.hash),
    keccak256,
    { sortPairs: true },
  )
  entries = entries.map((entry) => {
    const newEntry = entry as any
    newEntry.hash = hexValue(entry.hash)
    newEntry.proof = newtree.getHexProof(entry.hash)
    return newEntry
  })

  const whitelistedUser = entries.find((entry) => entry.minter === minter)

  return whitelistedUser.proof
}

export default generateMerkleProof
