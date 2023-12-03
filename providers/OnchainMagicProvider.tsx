import { createContext, useContext, useMemo } from "react"
import useOnchainMagic from "../hooks/useOnchainMagic"

const OnchainMagicContext = createContext(null)

const OnchainMagicProvider = ({ children }) => {
  const onchainMagic = useOnchainMagic()

  const value = useMemo(() => ({ ...onchainMagic }), [onchainMagic])

  return <OnchainMagicContext.Provider value={value}>{children}</OnchainMagicContext.Provider>
}

export const useOnchainMagicProvider = () => {
  const context = useContext(OnchainMagicContext)
  if (!context) {
    throw new Error("useOnchainMagicProvider must be used within a OnchainMagicProvider")
  }
  return context
}

export default OnchainMagicProvider
