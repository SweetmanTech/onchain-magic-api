import { Signer, ethers } from "ethers"
import { Multicall, ContractCallResults, ContractCallContext } from "ethereum-multicall"
import collectionHolderAbi from "./abi-collection-holder.json"
import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"
import getNFTs from "./alchemy/getNFTs"
import friendAndFamilyAbi from "./abi-friend-family.json"
import minterUtilitiesAbi from "./abi-minter-utilities.json"
import cre8orsAbi from "./abi-cre8ors.json"

export const getPassports = async (address: string) => {
  const res = await getNFTs(
    address,
    process.env.NEXT_PUBLIC_CLAIM_PASSPORT_ADDRESS,
    process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
  )
  return res?.ownedNfts
}

export const getPassportIds = async (address: string) => {
  const response = await getPassports(address)

  return response
}

export const checkFreeMintClaimed = async (passportId: string) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
    collectionHolderAbi,
    provider,
  )
  try {
    const response = await contract.freeMintClaimed(parseInt(passportId, 10))
    return response
  } catch (err) {
    handleTxError(err)
    return 0
  }
}

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
  const merkleRootCalls = [
    {
      reference: "merkleRoot",
      methodName: "saleDetails",
      methodParameters: [],
    },
  ]
  const quantityLeftCalls = [
    {
      reference: "quantityLeft",
      methodName: "quantityLeft",
      methodParameters: [
        process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
        process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
        process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
        address,
      ],
    },
  ]
  const multicall = new Multicall({
    ethersProvider: getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1),
    tryAggregate: true,
  })
  const contractCallContext: ContractCallContext[] = [
    {
      reference: "discount",
      contractAddress: process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
      abi: friendAndFamilyAbi,
      calls: discountCalls,
    },
    {
      reference: "quantityLeft",
      contractAddress: process.env.NEXT_PUBLIC_MINTER_UTILITY,
      abi: minterUtilitiesAbi,
      calls: quantityLeftCalls,
    },
    {
      reference: "merkleRoot",
      contractAddress: process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
      abi: cre8orsAbi,
      calls: merkleRootCalls,
    },
  ]
  if (calls.length > 0) {
    contractCallContext.push({
      reference: "freeMintClaimed",
      contractAddress: process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
      abi: collectionHolderAbi,
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
  const quantityLeft = results?.results?.quantityLeft?.callsReturnContext[0]?.returnValues?.[0]?.hex
  const merkleRoot = results?.results?.merkleRoot?.callsReturnContext[0]?.returnValues?.[8]
  return {
    passports: availablePassportIds?.filter((id) => id !== null),
    discount,
    quantityLeft: parseInt(quantityLeft, 16),
    merkleRoot,
  }
}

export const mintByCollectionHolder = async (
  signer: Signer,
  passportIds: any,
  to: string,
  onSuccess: any,
) => {
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
    collectionHolderAbi,
    signer,
  )
  try {
    const tx = await contract.mint(passportIds, to, {
      gasLimit: 500000 * passportIds.length,
    })
    await tx.wait()
    await onSuccess?.()
    return { error: false }
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}
