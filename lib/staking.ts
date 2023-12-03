import { Contract, Signer } from "ethers"
import { toast } from "react-toastify"
import { Multicall, ContractCallResults, ContractCallContext } from "ethereum-multicall"
import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"
import stakingAbi from "./abi-staking.json"

export const processStaking = async (
  contract: Contract,
  tokenId: string | number,
  onSuccess: any,
  stake?: boolean,
  setIsProcessing?: (state: boolean) => void,
) => {
  try {
    setIsProcessing(true)
    const tx = await contract.toggleCre8ing([tokenId])
    await tx.wait()
    setIsProcessing(false)
    toast.success(`Successfully ${stake ? "staked" : "unstaked"}!`)
    await onSuccess()
  } catch (err) {
    handleTxError(err)
  }
}

export const toggleCre8ingTokens = async (signer: Signer, tokenId: number) => {
  try {
    const contract = new Contract(process.env.NEXT_PUBLIC_STAKING_ADDRESS, stakingAbi, signer)
    const tx = await contract.toggleCre8ingTokens(process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, [
      tokenId,
    ])
    const receipt = await tx.wait()
    return receipt
  } catch (err) {
    handleTxError(err)
    return { err }
  }
}
export const aggregateReads = async (tokenIds: Array<number | string>) => {
  const calls = tokenIds.map((id) => ({
    reference: "getCre8ingStarted",
    methodName: "getCre8ingStarted",
    methodParameters: [process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, id],
  }))

  const multicall = new Multicall({
    ethersProvider: getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1),
    tryAggregate: true,
  })

  const contractCallContext: ContractCallContext[] = []

  if (calls.length > 0) {
    contractCallContext.push({
      reference: "getCre8ingStarted",
      contractAddress: process.env.NEXT_PUBLIC_STAKING_ADDRESS,
      abi: stakingAbi,
      calls,
    })
  }

  const results: ContractCallResults = await multicall.call(contractCallContext)

  return results
}

export const getStakedAndUnstakedResults = async (tokenIds: Array<number | string>) => {
  if (!tokenIds.length) return []

  const results = await aggregateReads(tokenIds)

  const stakedAndUnstakedResults = results?.results?.getCre8ingStarted?.callsReturnContext.map(
    (call) => ({
      tokenId: call.methodParameters[1],
      getCre8ingStarted: parseInt(call.returnValues[0].hex, 16),
    }),
  )

  return [...stakedAndUnstakedResults]
}
