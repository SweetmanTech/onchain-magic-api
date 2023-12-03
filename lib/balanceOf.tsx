import { Signer } from "ethers"
import balanceOfAddress from "./balanceOfAddress"

const balanceOf = async (signer: Signer) => {
  const address = await signer.getAddress()

  const response = await balanceOfAddress(address)
  return response
}

export default balanceOf
