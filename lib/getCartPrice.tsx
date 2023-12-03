import { Contract } from "ethers"
import minterUtilityAbi from "./abi-minter-utilities.json"
import getDefaultProvider from "./getDefaultProvider"

const getCartPrice = async (cart: any) => {
  const contract = new Contract(
    process.env.NEXT_PUBLIC_MINTER_UTILITY,
    minterUtilityAbi,
    getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1),
  )
  const cost = await contract.calculateTotalCost(cart)
  return cost.toString()
}

export default getCartPrice
