import { Schema, model, models, Model } from "mongoose"

interface DNAMetadata {
  tokenId: string
  dnaType: string
}

const DNAMetadataSchema = new Schema<DNAMetadata>({
  tokenId: {
    type: String,
    required: [true, "Please add a tokenId"],
  },
  dnaType: {
    type: String,
    required: [true, "Please add a dnaType"],
  },
})

export default (models.DNAMetadata as Model<DNAMetadata>) || model("DNAMetadata", DNAMetadataSchema)
