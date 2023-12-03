import axios from "axios"

export const getAvatarByTwitterHandle = async (twitterHandle: string) => {
  try {
    const response = await axios.get(
      `https://api.twitter.com/1.1/users/show.json?screen_name=${twitterHandle}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
        },
      },
    )

    return response?.data?.profile_image_url_https
  } catch (err) {
    return ""
  }
}
