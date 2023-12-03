import { Schema, model, models, Model } from "mongoose"

interface Auth {
  collectionName: string
  apiKey: string
}
const AuthSchema = new Schema<Auth>({
  collectionName: {
    type: String,
    required: [true, "Please add a collection string"],
  },
  apiKey: {
    type: String,
    required: [true, "Please add apiKey"],
  },
})
export default (models.Auth as Model<Auth>) || model("Auth", AuthSchema)
