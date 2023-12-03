import DNAMetadata from "../Models/DNAMetadata"
import dbConnect from "../utils/db"

export const addDNAMetadata = async (body: { tokenId?: string; dnaType?: string }) => {
  try {
    await dbConnect()
    const result = await DNAMetadata.create(body)
    return { sucess: true, result }
  } catch (error) {
    throw new Error(error)
  }
}

export const getDNAMetadata = async (tokenId: string) => {
  try {
    await dbConnect()
    const result = await DNAMetadata.findOne({ tokenId }).lean()
    if (!result) return { success: false, error: "No DNA Metadata found" }
    return {
      success: true,
      result,
    }
  } catch (e) {
    return {
      success: false,
      error: e,
    }
  }
}
