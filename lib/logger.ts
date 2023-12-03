import axios from "axios"

export const log = async (body: any) => {
  await axios.post("/api/log", body)
}
