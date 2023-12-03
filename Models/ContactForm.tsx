import { Schema, model, models, Model } from "mongoose"

interface ContactForm {
  name: string
  email: string
  message: string
}

const ContactFormSchema = new Schema<ContactForm>({
  name: {
    type: String,
    required: [true, "Please add a wallet address"],
  },
  email: {
    type: String,
    required: [true, "Please add a twitter handle"],
  },
  message: {
    type: String,
    required: [true, "Please add a reason"],
  },
})
export default (models.ContactForm as Model<ContactForm>) || model("ContactForm", ContactFormSchema)
