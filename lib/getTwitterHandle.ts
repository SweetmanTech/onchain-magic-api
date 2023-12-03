import getParticipants from "./getParticipants"

const getTwitterHandle = async (address: string) => {
  const participants = await getParticipants()
  return participants[address.toLowerCase()]
}

export default getTwitterHandle
