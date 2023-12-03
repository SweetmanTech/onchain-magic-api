import { BigNumber, Contract } from "ethers"
import { useAccount } from "wagmi"
import { toast } from "react-toastify"
import abi from "../lib/abi-zora-drop.json"
import { useEthersSigner } from "./useEthersSigner"
import handleTxError from "../lib/handleTxError"
import useCheckNetwork from "./useCheckNetwork"
import useSaleStatus from "./useSaleStatus"

const useZoraMint = () => {
  const signer = useEthersSigner({ chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10) })
  const { publicSalePrice } = useSaleStatus()
  const { checkNetwork } = useCheckNetwork()
  const { address } = useAccount()

  const mintWithRewards = async () => {
    try {
      if (!checkNetwork()) {
        throw new Error("switch your network")
      }
      const quantity = 1
      const contract = new Contract(process.env.NEXT_PUBLIC_DROP_ADDRESS, abi, signer)
      const zoraFee = await contract.zoraFeeForAmount(quantity)
      const zoraFeeWei = zoraFee.fee.toString()
      const comment = ""
      const mintReferral = process.env.NEXT_PUBLIC_MINT_REFERRAL
      const tx = await contract.mintWithRewards(address, quantity, comment, mintReferral, {
        value: BigNumber.from(publicSalePrice + zoraFeeWei).toString(),
        gasLimit: 300293,
      })
      const receipt = await tx.wait()
      toast.success("unlocked!")
      return receipt
    } catch (err) {
      handleTxError(err)
      return { err }
    }
  }

  return {
    mintWithRewards,
  }
}
export default useZoraMint
