import getParticipants from "./getParticipants"

const isAddressRegistered = async (address: string) => {
  const data = await getParticipants()
  const twitterHandle = data[address.toLowerCase()]
  return Boolean(twitterHandle)
}

export default isAddressRegistered
