import { Signer, ethers } from "ethers"
import { Multicall, ContractCallResults, ContractCallContext } from "ethereum-multicall"
import freeMinterAbi from "./abi-free-minter.json"
import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"

export const aggregateReads = async (passportIds: Array<number | string>, address: string) => {
  const calls = passportIds.map((id) => ({
    reference: "freeMintClaimed",
    methodName: "freeMintClaimed",
    methodParameters: [id],
  }))

  const discountCalls = [
    {
      reference: "discount",
      methodName: "hasDiscount",
      methodParameters: [address],
    },
  ]

  const multicall = new Multicall({
    ethersProvider: getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1),
    tryAggregate: true,
  })
  const contractCallContext: ContractCallContext[] = [
    {
      reference: "discount",
      contractAddress: process.env.NEXT_PUBLIC_FREE_MINTER_ADDRESS,
      abi: freeMinterAbi,
      calls: discountCalls,
    },
  ]
  if (calls.length > 0) {
    contractCallContext.push({
      reference: "freeMintClaimed",
      contractAddress: process.env.NEXT_PUBLIC_FREE_MINTER_ADDRESS,
      abi: freeMinterAbi,
      calls,
    })
  }
  const results: ContractCallResults = await multicall.call(contractCallContext)
  return results
}

export const getAvailableFreeMints = async (
  passportIds: Array<number | string>,
  address: string,
) => {
  const results = await aggregateReads(passportIds, address)

  const availablePassportIds = results?.results?.freeMintClaimed?.callsReturnContext.map((call) => {
    if (call.returnValues[0] === false) {
      return parseInt(call.methodParameters[0], 16)
    }
    return null
  })
  const discount = results?.results?.discount?.callsReturnContext[0]?.returnValues[0]
  return {
    passports: availablePassportIds?.filter((id) => id !== null),
    discount,
  }
}

export const mintByFreeMintV2 = async (signer: Signer, passportIds: any, to: string) => {
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_FREE_MINTER_ADDRESS,
    freeMinterAbi,
    signer,
  )
  try {
    const tx = await contract.mint(passportIds, to)
    await tx.wait()
    return { error: false }
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}
