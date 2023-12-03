/* eslint-disable no-console */

import getDecodedMulticall from "../../../../lib/getDecodedMulticall"

const decodedMulticall = async (calls = []) => {
  let response
  try {
    console.log("SWEETS HELLO WORLD", calls)
    const decodedCalls = calls.map((call) => getDecodedMulticall(call))

    response = { calls, decodedCalls }
  } catch (ex) {
    response = { data: false }
    console.error(ex)
  }
  return response
}

export default async function handler(req: any, res: any) {
  console.log("SWEETS req", req.query.multicalls)
  const data = await decodedMulticall(req?.query?.multicalls)
  res.status(200).json(data)
}
