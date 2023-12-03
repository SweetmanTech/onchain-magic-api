import { Schema, model, models, Model, Document } from "mongoose";

interface UserProfile extends Document {
  walletAddress: string;
  username?: string;
  bio?: string;
  twitterHandle?: string;
  location?: string;
  iNeedHelpWith?: string;
  askMeAbout?: string;
  avatarUrl?: string;
  cre8orNumber?: string;
}

const UserProfileSchema = new Schema<UserProfile>({
  walletAddress: {
    type: String,
    unique: true,
    required: [true, "Please add a wallet address"]
  },
  username: {
    type: String,
    required: [false, "Please add a username"],
  },
  bio: {
    type: String,
    required: [false, "Please add a bio"],
  },
  twitterHandle: {
    type: String,
    required: [false, "Please add a twitter handle"],
  },
  location: {
    type: String,
    required: [false, "Please add a location"],
  },
  iNeedHelpWith: {
    type: String,
    required: [false, "Please add a iNeedHelpWith"],
  },
  askMeAbout: {
    type: String,
    required: [false, "Please add a askMeAbout"],
  },
  avatarUrl: {
    type: String,
    required: [false, "Please add a avatarUrl"],
  },
  cre8orNumber: {
    type: String,
    required: [false, "Please add a cre8orNumber"],
  }
});

export default (models.UserProfile as Model<UserProfile>) || model("UserProfile", UserProfileSchema);
