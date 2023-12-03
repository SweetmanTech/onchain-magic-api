import { ContractInterface, ethers, Signer } from "ethers"

import handleTxError from "./handleTxError"

const acceptedApplicants = async (
  contractAddress: string,
  signer: Signer,
  abi: ContractInterface,
  tokenIDs: string[],
  imageUris: string[],
) => {
  const contract = new ethers.Contract(contractAddress, abi, signer)
  try {
    const tx = await contract.updateMetadata(
      process.env.NEXT_PUBLIC_ALLOWLIST_CONTRACT_ADDRESS,
      tokenIDs,
      imageUris,
    )
    const receipt = await tx.wait()
    return receipt
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}

export default acceptedApplicants
