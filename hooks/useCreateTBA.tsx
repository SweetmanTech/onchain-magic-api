import { Contract } from "ethers"
import handleTxError from "../lib/handleTxError"
import abi from "../lib/abi-dna-minter.json"
import { useEthersSigner } from "./useEthersSigner"

const useCreateTBA = () => {
  const signer = useEthersSigner({ chainId: process.env.NEXT_PUBLIC_TESTNET ? 5 : 1 })

  const createTbaAndMintDna = async (cre8orNumber) => {
    try {
      const dnaMinter = process.env.NEXT_PUBLIC_DNA_MINTER
      const contract = new Contract(dnaMinter, abi, signer)
      const tx = await contract.createTokenBoundAccountAndMintDNA(cre8orNumber, {
        gasLimit: 200000,
      })
      await tx.wait()
    } catch (err) {
      handleTxError(err)
    }
  }

  return {
    createTbaAndMintDna,
  }
}

export default useCreateTBA
