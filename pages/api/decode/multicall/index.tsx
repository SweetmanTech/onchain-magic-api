import getDecodedMulticall from "../../../../lib/getDecodedMulticall"

const decodedMulticall = async (calls = []) => {
  let response
  try {
    const decodedCalls = calls.map((call) => getDecodedMulticall(call))
    response = { calls, decodedCalls }
  } catch (ex) {
    response = { data: false }
    // eslint-disable-next-line no-console
    console.error(ex)
  }
  return response
}

export default async function handler(req: any, res: any) {
  const data = await decodedMulticall(req?.query?.multicalls)
  res.status(200).json(data)
}
