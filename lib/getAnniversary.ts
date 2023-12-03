import getAssetTransfers from "./alchemy/getAssetTransfers"
import getBlockByNumber from "./alchemy/getBlockByNumber"

const getAnniversary = async (address: string) => {
  const transfers = await getAssetTransfers(address)
  const block = await getBlockByNumber(transfers[0].blockNum)
  const parsedEpoch = parseInt(block.timestamp, 16)
  return parsedEpoch
}

export default getAnniversary
