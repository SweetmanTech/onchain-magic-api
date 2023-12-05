import axios from "axios"
import QueryString from "qs"

const getDecoded = async (multicalls) => {
  const response = await axios.get("/api/decode/multicall", {
    params: {
      multicalls,
    },
    paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: "repeat" }),
  })
  return response.data.decodedCalls
}

export default getDecoded
