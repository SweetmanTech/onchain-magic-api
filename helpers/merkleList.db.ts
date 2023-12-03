import dbConnect from "../utils/db"

import MerkleList from "../Models/MerkleList"

type Entry = {
  minter: string
  proof: string[]
}
interface MerkleList {
  root: string
  entries?: Entry[]
  timestamp?: Date | string
}

export const addMerkleList = async (body: MerkleList) => {
  try {
    await dbConnect()
    const result = await MerkleList.create(body)
    return { sucess: true, result }
  } catch (e) {
    throw new Error(e)
  }
}

export const getMerkleList = async (root: string) => {
  try {
    await dbConnect()
    const docs = await MerkleList.countDocuments({ root: { $regex: root, $options: "i" } })
    if (docs === 0) {
      return { sucess: false, message: "Merkle root not found" }
    }
    const result = await MerkleList.findOne({ root: { $regex: root, $options: "i" } }).lean()
    return { sucess: true, result }
  } catch (e) {
    throw new Error(e)
  }
}
