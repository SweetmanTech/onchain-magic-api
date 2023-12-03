import { UpdateCre8orNumberDTO } from "../DTO/updateCre8orNumber.dto"
import UserProfile from "../Models/UserProfile"
import { getEnsImageURL } from "../lib/getEnsImageURL"
import { getAvatarByTwitterHandle } from "../lib/getTwitterAvatarByHandle"
import dbConnect from "../utils/db"

export interface UserProfile {
  walletAddress: string
  username?: string
  bio?: string
  twitterHandle?: string
  location?: string
  iNeedHelpWith?: string
  askMeAbout?: string
}

const getFilterObject = (value) => ({
  $regex: value,
  $options: "i"
})

const getUserAvatar = async (walletAddress: string, twitterHandle: string) => {
  const ensImageURL = await getEnsImageURL(walletAddress)
  const twitterImageURL = await getAvatarByTwitterHandle(twitterHandle)

  return twitterImageURL || ensImageURL || ""
}

export const userNameExists = async (username: string) => {
  try {
    await dbConnect()
    const doc = await UserProfile.countDocuments({ username })
    if (doc > 0) {
      return true
    }
    return false
  } catch (e) {
    throw new Error(e)
  }
}

export const userProfileExists = async (walletAddress: string) => {
  try {
    await dbConnect()
    const doc = await UserProfile.countDocuments({ walletAddress: getFilterObject(walletAddress) })
    if (doc > 0) {
      return true
    }
    return false
  } catch (e) {
    throw new Error(e)
  }
}

export const addUserProfile = async (body: UserProfile) => {
  try {
    await dbConnect()

    const isExists = await userProfileExists(body.walletAddress)

    if(isExists) {
      throw new Error("User profile already existed!")
    }

    const avatarUrl = await getUserAvatar(body.walletAddress, body.twitterHandle)

    const result = await UserProfile.create({
      ...body,
      walletAddress: body.walletAddress?.toLowerCase(),
      avatarUrl
    })

    return { success: true, result }
  } catch (e) {
    throw new Error(e)
  }
}

export const updateUserProfile = async (body: UserProfile) => {
  try {
    await dbConnect()

    const doc = await UserProfile.findOne({ walletAddress: getFilterObject(body.walletAddress) }).lean()
    if (!doc) {
      throw new Error("No user found")
    }
    
    const newProfile = {
      ...body,
      avatarUrl: doc.avatarUrl
    }

    if((doc.twitterHandle !== body.twitterHandle) || (doc.twitterHandle && !newProfile.avatarUrl)) {
      const avatarUrl = await getUserAvatar(body.walletAddress, body.twitterHandle)

      newProfile.avatarUrl = avatarUrl
    }
    
    const results = await UserProfile.findOneAndUpdate({ walletAddress: getFilterObject(body.walletAddress) }, newProfile)

    return { success: true, results }
  } catch (e) {
    throw new Error(e)
  }
}

export const updateUserCre8orNumber = async (body: UpdateCre8orNumberDTO) => {
  try {
    const { cre8orNumber, walletAddress } = body
    
    await dbConnect()

    const doc = await UserProfile.findOne({ walletAddress: getFilterObject(walletAddress) }).lean()
    if (!doc) {
      throw new Error("No user found")
    }
    
    const newProfile = {
      cre8orNumber
    }

    const results = await UserProfile.findOneAndUpdate({ walletAddress: getFilterObject(walletAddress) }, newProfile)

    return { success: true, results }
  } catch (e) {
    throw new Error(e)
  }
}

export const getUserProfile = async (walletAddress: string) => {
  try {
    await dbConnect()

    let doc = await UserProfile.findOne({ walletAddress: getFilterObject(walletAddress) }).lean() 

    if(doc) {
      const avatarUrl = await getUserAvatar(doc.walletAddress, doc.twitterHandle)

      if(avatarUrl) await UserProfile.findOneAndUpdate({_id: doc._id}, { $set: { avatarUrl } })
    }

    return { success: true, doc }
  } catch (e) {
    throw new Error(e)
  }
}

export const getSimilarProfiles = async (walletAddress: string) => {
  try {
    await dbConnect()
    const userProfile = await UserProfile.findOne({walletAddress: getFilterObject(walletAddress)}).lean()
   
    if (!userProfile?.location) return { success:true, similarProfiles: [] } 

    const pipline = [
      {
        $project: {
          location: 1,
          twitterHandle: 1,
          avatarUrl: 1,
          username: 1,
          iNeedHelpWith: 1,
          askMeAbout: 1,
          walletAddress: { $toLower: '$walletAddress' },
        },
      },
      {
        $match: {
          walletAddress: { $ne: walletAddress?.toLowerCase() },
          location: userProfile.location,
        }
      },
    ]

    const doc = await UserProfile.aggregate(pipline)

    return { success: true, similarProfiles: doc }
  } catch(e) {
    throw new Error(e)  
  }
}
