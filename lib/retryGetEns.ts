import getEns from "./getEns"

const RATE_LIMIT_ERROR =
  "Your app has exceeded its compute units per second capacity. If you have retries enabled, you can safely ignore this message. If not, check out https://docs.alchemyapi.io/guides/rate-limits"

// eslint-disable-next-line no-promise-executor-return
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const retryGetEns = async (address: string) => {
  try {
    return await getEns(address)
  } catch (err) {
    const reason = err?.response?.data
    if (reason === RATE_LIMIT_ERROR) {
      await wait(1000)
      return retryGetEns(address)
    }
    return {}
  }
}

export default retryGetEns
