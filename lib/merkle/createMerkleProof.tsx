import MerkleTree from "merkletreejs"
import keccak256 from "keccak256"
import hashMerkleEntry from "./hashMerkleEntry"
import { getWhitelistedUsers } from "./getWhitelistedUsers"

const createMerkleProof = (address) => {
  if (!address) return {}
  const whitelistedUsers = getWhitelistedUsers()
  const entries = whitelistedUsers.map((entry) => {
    const newEntry = { ...entry } as any
    newEntry.hash = hashMerkleEntry(entry)
    return newEntry
  })

  const tree = new MerkleTree(
    entries.map((entry) => entry.hash),
    keccak256,
    { sortPairs: true },
  )

  const entryToProve = entries.find((entry) => entry.minter === address)
  if (!entryToProve) {
    throw new Error("Address not found in whitelisted users")
  }

  const proof = tree.getHexProof(entryToProve.hash)
  return {
    root: tree.getHexRoot(),
    proof,
  }
}

export default createMerkleProof
