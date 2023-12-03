import { ContractInterface, ethers, Signer } from "ethers"

import handleTxError from "./handleTxError"

const purchase = async (
  contractAddress: string,
  signer: Signer,
  abi: ContractInterface,
  formResponse?: string,
) => {
  const contract = new ethers.Contract(contractAddress, abi, signer)
  try {
    const tx = formResponse ? await contract.purchase(1, formResponse) : await contract.purchase(1)
    const receipt = await tx.wait()
    return receipt
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}

export default purchase
