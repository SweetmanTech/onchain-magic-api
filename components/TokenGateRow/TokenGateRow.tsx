import { useState } from "react"
import { AiFillLock } from "react-icons/ai"
import { useAccount } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { Button } from "../../shared/Button"
import MintingModal from "../MintingModal"
import useZoraMint from "../../hooks/useZoraMint"

const TokenGateRow = ({ numberOfRows, fetchBalance }) => {
  const [minting, setMinting] = useState(false)
  const { mintWithRewards } = useZoraMint()
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()

  const handleClick = async () => {
    if (!isConnected) {
      openConnectModal()
      return
    }
    setMinting(true)
    await mintWithRewards()
    await fetchBalance()
    setMinting(false)
  }

  return (
    <tr className="text-center bg-white text-black hover:bg-blue-300">
      <td
        className="text-[8px] xs:text-[11px] md:text-[16px]
p-[5px] md:px-4 md:py-2 border-r-2 border-black"
      >
        <span>{numberOfRows}+ more</span>
      </td>
      <td
        className="text-[8px] xs:text-[11px] md:text-[16px]
p-[5px] md:px-4 md:py-2 border-r-2 border-black"
      >
        <div className="flex justify-center">
          <Button onClick={handleClick} id="mint">
            MINT to unlock
          </Button>
        </div>
      </td>

      <td
        className="text-[8px] xs:text-[11px] md:text-[16px]
p-[5px] md:px-4 md:py-2 border-r-2 border-black"
      >
        <div className="flex justify-center">
          <AiFillLock size={100} />
        </div>
      </td>
      {minting && <MintingModal />}
    </tr>
  )
}

export default TokenGateRow
