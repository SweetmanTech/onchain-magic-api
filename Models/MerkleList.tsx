import { Schema, model, models, Model } from "mongoose"

type Entry = {
  minter: string
  proof: string[]
}
interface MerkleList {
  root: string
  entries: Entry[]
  timestamp?: Date | string
}
const EntrySchema = new Schema<Entry>({
  minter: {
    type: String,
    required: [true, "Please add a minter"],
  },
  proof: {
    type: [String],
    required: [true, "Please add a proof"],
  },
})
const MerkleListSchema = new Schema<MerkleList>({
  root: {
    type: String,
    required: [true, "Please add a minter"],
    unique: true,
    lowercase: true,
  },
  entries: {
    type: [EntrySchema],
    required: [false, "Please add a proof"],
  },
  timestamp: {
    type: Date,
    required: [false, "Please add a timestamp"],
  },
})

export default (models.MerkleList as Model<MerkleList>) || model("MerkleList", MerkleListSchema)
