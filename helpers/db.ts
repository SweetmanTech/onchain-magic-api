import { error } from "console"
import _ from "lodash"
import { ApplicantDTO } from "../DTO/applicant.dto"
import { ContactFormDTO } from "../DTO/contactform.dto"
import AllowList from "../Models/AllowList"
import ContactForm from "../Models/ContactForm"
import { ParticipantDTO } from "../DTO/participant.dto"
import Participants from "../Models/Participants"
import dbConnect from "../utils/db"

interface UpdateAllowListApplicant {
  creatorType?: string
  responseId?: string
  timestamp?: string
  tokenId?: string
}
interface Result {
  walletAddress: string
  twitterHandle: string
}
export const addAllowListApplicant = async (body: ApplicantDTO) => {
  try {
    await dbConnect()
    const result = await AllowList.create(body)
    return { sucess: true, result }
  } catch (e) {
    error(e)
    throw new Error(e)
  }
}
export const getAcceptedAllowlistApplicants = async () => {
  try {
    await dbConnect()
    const result = await AllowList.find({ status: "Accepted" }).lean()
    return { sucess: true, result }
  } catch (e) {
    throw new Error(e)
  }
}

export const deleteAllowListApplicant = async (id: string) => {
  try {
    await dbConnect()
    const result = await AllowList.remove({ _id: id })
    return { sucess: true, result }
  } catch (e) {
    error(e)
    throw new Error(e)
  }
}
export const typeformResponseExists = async (responseId: string) => {
  try {
    await dbConnect()
    const result = await AllowList.countDocuments({ responseId })
    return result > 0
  } catch (e) {
    error(e)
    throw new Error(e)
  }
}

export const getAllowListApplicantByResponseId = async (responseId: string) => {
  try {
    await dbConnect()
    const result = await AllowList.findOne({ responseId }).lean()
    return result
  } catch (e) {
    throw new Error(e)
  }
}

export const getAllowListApplicantByWalletAddress = async (walletAddress: string) => {
  try {
    await dbConnect()
    const result = await AllowList.findOne({
      walletAddress: { $regex: walletAddress, $options: "i" },
    }).lean()
    return result
  } catch (e) {
    error(e)
    throw new Error(e)
  }
}

export const getAllowListApplicantByTwitterHandle = async (twitterHandle: string) => {
  try {
    await dbConnect()
    const result = await AllowList.findOne({
      twitterHandle: { $regex: twitterHandle, $options: "i" },
    }).lean()
    return result
  } catch (e) {
    error(e)
    throw new Error(e)
  }
}
export const addMessage = async (body: ContactFormDTO) => {
  try {
    await dbConnect()
    const result = await ContactForm.create(body)
    return { sucess: true, result }
  } catch (e) {
    error(e)
    throw new Error(e)
  }
}

export const getAllowListApplicant = async (address: string) => {
  try {
    await dbConnect()
    const result = await AllowList.findOne({ walletAddress: address }).lean()
    return result
  } catch (e) {
    throw new Error(e)
  }
}

export const updateAllowlistApplicant = async (walletAddress: string, status: string) => {
  try {
    await dbConnect()
    const result = await AllowList.findOneAndUpdate({ walletAddress }, { status })
    return { sucess: true, result }
  } catch (e) {
    throw new Error(e)
  }
}

export const getAllAllowListApplicants = async () => {
  try {
    await dbConnect()
    const result = await AllowList.find({}).lean()
    return result as any
  } catch (e) {
    throw new Error(e)
  }
}

export const updateAllowListApplicantResponseIds = async (
  address: string,
  body: UpdateAllowListApplicant,
) => {
  try {
    await dbConnect()
    const currentDoc = (await getAllowListApplicant(address)) as any
    const originalResponseIds = currentDoc?.typeformResponses || []
    const newResponseIds = [
      { id: body.responseId, timestamp: body.timestamp },
      ...originalResponseIds,
    ]
    const result = await AllowList.findOneAndUpdate(
      { walletAddress: address },
      { typeformResponses: _.uniqBy(newResponseIds, "id"), currentResponseId: body.responseId },
    )
    return { sucess: true, result }
  } catch (e) {
    throw new Error(e)
  }
}

export const updateStatus = async (applicants: string[], status: string) => {
  try {
    await dbConnect()
    const [result] = await Promise.all(
      applicants.map(async (applicant) => {
        await AllowList.findOneAndUpdate({ _id: applicant }, { status })
      }),
    )
    return { sucess: true, result }
  } catch (e) {
    throw new Error(e)
  }
}

export const addTokenIdToAllowListApplicant = async (address: string, tokenId: string) => {
  try {
    await dbConnect()
    const result = await AllowList.findOneAndUpdate({ walletAddress: address }, { tokenId })
    return { sucess: true, result }
  } catch (e) {
    throw new Error(e)
  }
}

export const verifyAllowListApplicant = async (address: string, isVerified: boolean) => {
  try {
    await dbConnect()
    const result = await AllowList.findOneAndUpdate({ walletAddress: address }, { isVerified })
    return { sucess: true, result }
  } catch (e) {
    throw new Error(e)
  }
}

export const getAllParticipants = async () => {
  try {
    await dbConnect()
    const result: Result[] = await Participants.find({}).lean()
    return result
  } catch (e) {
    throw new Error(e)
  }
}

export const addParticipant = async (body: ParticipantDTO) => {
  try {
    await dbConnect()
    const result = await Participants.create(body)
    return { sucess: true, result }
  } catch (e) {
    error(e)
    throw new Error(e)
  }
}
