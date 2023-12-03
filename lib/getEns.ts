import getNFTs from "./alchemy/getNFTs"

const ENS = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85"

const getEns = async (address: string) => {
  const names = await getNFTs(address, ENS, 1)
  const oldestName = names.ownedNfts.pop()
  return oldestName
}

export default getEns
