import { Schema, model, models, Model } from "mongoose"

interface Participant {
  walletAddress: string
  twitterHandle: string
}

const ParticipantSchema = new Schema<Participant>({
  walletAddress: {
    type: String,
    required: [true, "Please add a wallet address"],
  },
  twitterHandle: {
    type: String,
    required: [true, "Please add a twitter handle"],
  },
})

export default (models.Participant as Model<Participant>) || model("Participant", ParticipantSchema)
