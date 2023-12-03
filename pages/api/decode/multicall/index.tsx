/* eslint-disable no-console */

const decodedMulticall = async (calls = 1) => {
  let response
  try {
    console.log("SWEETS HELLO WORLD", calls)
    response = { hello: "world" }
  } catch (ex) {
    response = { data: false }
    console.error(ex)
  }
  return response
}

export default async function handler(req: any, res: any) {
  const data = await decodedMulticall(req?.query?.calls)
  res.status(200).json(data)
}
