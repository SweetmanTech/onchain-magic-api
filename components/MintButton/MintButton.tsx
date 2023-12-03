import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image"
import { FC, useState } from "react"
import Confetti from "react-confetti"
import { ContractInterface } from "ethers/lib/ethers"
import purchase from "../../lib/purchase"
import useWindowSize from "../../lib/useWindowSize"
import customLoader from "../../lib/customLoader"
import { useEthersSigner } from "../../hooks/useEthersSigner"

interface MintButtonProps {
  contractAddress: string
  abi: ContractInterface
  formResponse?: string
  resetFormResponse?: (value: string) => void
}
const MintButton: FC<MintButtonProps> = ({ contractAddress, abi }) => {
  const [loading, setLoading] = useState(false)
  const [startConfetti, setStartConfetti] = useState(false)
  const signer = useEthersSigner()
  const { width, height } = useWindowSize()

  const handleClick = async () => {
    if (!signer) return
    setLoading(true)
    const receipt = await purchase(contractAddress, signer, abi)
    if (!receipt.error) {
      setStartConfetti(true)
      setTimeout(() => {
        setStartConfetti(false)
      }, 5000)
    }
    setLoading(false)
  }

  const className = `${loading ? "bg-blue-500/50" : "bg-blue-500"} ${
    !loading && "hover:bg-blue-700"
  } text-white font-bold py-2 px-4 rounded`
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted
        const connected = ready && account && chain

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className={className}>
                    Connect Wallet
                  </button>
                )
              }

              if (chain.id !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
                return (
                  <button onClick={openChainModal} type="button" className={className}>
                    Wrong network
                  </button>
                )
              }

              return (
                <button
                  type="button"
                  onClick={handleClick}
                  disabled={loading}
                  className={className}
                >
                  {loading ? (
                    <Image
                      src="/spinner.gif"
                      alt="spinner"
                      width={50}
                      height={50}
                      loader={customLoader}
                    />
                  ) : (
                    "Mint"
                  )}
                </button>
              )
            })()}
            {startConfetti && <Confetti width={width} height={height} />}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default MintButton
