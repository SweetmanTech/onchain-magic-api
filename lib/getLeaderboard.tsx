import axios from "axios"

const getLeaderboard = async (numberOfDays) => {
  const { data } = await axios.get(`/api/get/leaderboard?numberOfDays=${numberOfDays}`)
  return data
}

export default getLeaderboard
