import { utils } from "ethers"
import { defaultAbiCoder } from "ethers/lib/utils"
import abi from "./abi/zora-1155-implementation.json"

const getDecodedMulticall = (call) => {
  // Extract the method id (first 10 characters after '0x')
  const methodId = call.substring(2, 10)

  // Find the ABI entry
  const abiItem = abi.find((item) => {
    if (item.type !== "function") return false
    const signature = `${item.name}(${item.inputs.map((i) => i.type).join(",")})`
    const hashed = utils.keccak256(utils.toUtf8Bytes(signature)).substring(2, 10)
    return hashed === methodId
  })

  if (!abiItem) return `No matching function for methodId ${methodId}`

  // Decode parameters
  const params = defaultAbiCoder.decode(
    abiItem.inputs.map((i) => i.type),
    `0x${call.substring(10)}`,
  )
  return { functionName: abiItem.name, params }
}

export default getDecodedMulticall
