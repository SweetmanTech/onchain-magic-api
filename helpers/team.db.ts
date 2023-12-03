import _ from "lodash"
import dbConnect from "../utils/db"
import Team from "../Models/Team"

export interface TeamMember {
  name: string
  role?: string
  favQuote?: string
  imgSrc?: string
  twitterHandle?: string
  order?: number
}
export const addTeamMember = async (body: TeamMember[]) => {
  try {
    await dbConnect()
    const result = await Team.insertMany(body)
    return { sucess: true, result }
  } catch (error) {
    throw new Error(error)
  }
}
export const updateTeamMember = async (body: TeamMember[]) => {
  try {
    await dbConnect()
    const result = await Promise.all(
      body.map(async (item) =>
        Team.updateOne({ name: item.name }, { $set: item }, { upsert: true }),
      ),
    )
    return { sucess: true, result }
  } catch (error) {
    throw new Error(error)
  }
}
export const getTeamMembers = async () => {
  try {
    await dbConnect()
    const result = await Team.find({}).lean()
    return result as any
  } catch (e) {
    throw new Error(e)
  }
}

export const getTeamMemberData = async () => {
  const data = await getTeamMembers()
  const sortedData = _.sortBy(data, "order")
  const mappedData = sortedData.map((item) => ({
    name: item.name,
    role: item.role || null,
    favQuote: item.favQuote || null,
    imgSrc: item.imgSrc || null,
    twitterHandle: item.twitterHandle || null,
  }))
  return mappedData
}
