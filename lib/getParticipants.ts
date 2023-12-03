import axios from "axios"

const getParticipants = async () => {
  const { data } = await axios.get("/api/participants/get", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PARTICIPANTS_API_KEY}`,
    },
  })
  return data
}

export default getParticipants
