import { Schema, model, models, Model } from "mongoose"

interface Avatar {
  walletAddress?: string
  twitterHandle: string
  profileImage?: string
  ensName?: string
  ensImage?: string
  foundingMember?: boolean
}

const AvatarSchema = new Schema<Avatar>({
  walletAddress: {
    type: String,
    required: [false, "Please add a wallet address"],
  },
  twitterHandle: {
    type: String,
    required: [true, "Please add a twitter handle"],
  },

  profileImage: {
    type: String,
    required: [false, "Please add a profile image"],
  },
  ensName: {
    type: String,
    required: [false, "Please add an ens name"],
  },
  ensImage: {
    type: String,
    required: [false, "Please add an ens image"],
  },
  foundingMember: {
    type: Boolean,
    required: [false, "Please add a founding member"],
  },
})

export default (models.Avatars as Model<Avatar>) || model("Avatars", AvatarSchema)
