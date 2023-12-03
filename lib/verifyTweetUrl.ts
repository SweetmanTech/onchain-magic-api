import axios from "axios"

const verifyTweetUrl = async (tweetUrl: string) => {
  const response = await axios.post("/api/allowlist/verify", {
    tweetUrl,
  })
  return response?.data
}

export default verifyTweetUrl
