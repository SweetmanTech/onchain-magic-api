import { Schema, model, models, Model } from "mongoose"

interface AllowList {
  walletAddress: string
  twitterHandle: string
  reason: string
  creatorType: string
  outcomeChoice?: string
  responseId?: string
  status?: "Pending" | "Accepted" | "Rejected"
  isVerified?: boolean
}

const AllowListSchema = new Schema<AllowList>({
  walletAddress: {
    type: String,
    required: [true, "Please add a wallet address"],
  },
  twitterHandle: {
    type: String,
    required: [true, "Please add a twitter handle"],
  },
  reason: {
    type: String,
    required: [true, "Please add a reason"],
  },
  outcomeChoice: {
    type: String,
  },
  creatorType: {
    type: String,
    required: [true, "Please add a creator type"],
  },
  responseId: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
})
export default (models.AllowList as Model<AllowList>) || model("AllowList", AllowListSchema)
