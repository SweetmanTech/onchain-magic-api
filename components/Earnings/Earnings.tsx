import { formatEther } from "ethers/lib/utils"
import { useState } from "react"
import InfoBox from "../InfoBox"
import { useEthPriceProvider } from "../../providers/EthPriceProvider"

const Earnings = ({ label, fees }) => {
  const { ethPrice } = useEthPriceProvider()
  const [showUsd, setShowUsd] = useState(false)
  const creator = fees && parseFloat(formatEther(fees)) * (showUsd ? ethPrice : 1)

  return (
    <InfoBox
      label={label}
      value={`${fees && creator.toFixed(2)} ${showUsd ? "USD" : "ETH"}`}
      onClick={() => setShowUsd(!showUsd)}
    />
  )
}

export default Earnings
