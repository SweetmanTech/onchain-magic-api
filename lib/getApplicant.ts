import axios from "axios"

const getApplicant = async (address: string) => {
  const response = await axios.get(`/api/allowlist/getApplicant?address=${address}`)
  const { data } = response
  return data
}

export default getApplicant
