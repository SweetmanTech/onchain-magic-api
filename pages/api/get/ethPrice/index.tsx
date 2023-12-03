/* eslint-disable no-console */
import axios from "axios"

const getEthPrice = async () => {
  let response
  try {
    response = await axios.get(
      `https://min-api-v2.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${process.env.COINMARKETCAP_API_KEY}`,
    )
  } catch (ex) {
    response = { data: false }
    console.error(ex)
  }
  return response
}

export default async function handler(req: any, res: any) {
  const { data } = await getEthPrice()
  res.status(200).json(data)
}
