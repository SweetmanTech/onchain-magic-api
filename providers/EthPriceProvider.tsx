import { createContext, useContext, useMemo } from "react"
import useEthPrice from "../hooks/useEthPrice"

const EthPriceContext = createContext(null)

const EthPriceProvider = ({ children }) => {
  const { ethPrice } = useEthPrice() as any

  const value = useMemo(() => ({ ethPrice }), [ethPrice])

  return <EthPriceContext.Provider value={value}>{children}</EthPriceContext.Provider>
}

export const useEthPriceProvider = () => {
  const context = useContext(EthPriceContext)
  if (!context) {
    throw new Error("useEthPriceProvider must be used within a EthPriceProvider")
  }
  return context
}

export default EthPriceProvider
