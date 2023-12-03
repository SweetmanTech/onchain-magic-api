/* eslint-disable no-console */
import getProtocolRewardsLeaderboard from "../../../../lib/getProtocolRewardsLeaderboard"

const getLeaderboard = async (numberOfDays = 1) => {
  let response
  try {
    response = await getProtocolRewardsLeaderboard(numberOfDays)
  } catch (ex) {
    response = { data: false }
    console.error(ex)
  }
  return response
}

export default async function handler(req: any, res: any) {
  const data = await getLeaderboard(req?.query?.numberOfDays)
  res.status(200).json(data)
}
