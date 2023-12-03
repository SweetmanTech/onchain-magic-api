import axios from "axios"

const getEthPrice = async () => {
  try {
    const response: any = await axios.get("/api/get/ethPrice")
    return response?.data?.USD
  } catch (err) {
    return 0
  }
}

export default getEthPrice
