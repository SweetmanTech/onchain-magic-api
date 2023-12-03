import { useEffect, useState } from "react"
import retryGetEns from "../../lib/retryGetEns"
import truncateEthAddress from "../../lib/truncateEthAddress"
import Zorb from "../Zorb"
import { getChainBreakdowns } from "./chainBreakdowns"
import ChainRow from "./ChainRow"

const LeaderboardRow = ({ row, rank }) => {
  const {
    walletAddress: address,
    nftsOwned: numberOwned,
    ethereumReward,
    optimismReward,
    baseReward,
    zoraReward,
  } = row
  const [isExpanded, setIsExpanded] = useState(false)
  const [ensName, setEnsName] = useState(null as string)

  useEffect(() => {
    const init = async () => {
      const ensRecord = await retryGetEns(address)
      if (!ensRecord?.title) return
      setEnsName(ensRecord?.title)
    }

    if (!address) return
    init()
  }, [address])

  return (
    <>
      <tr key={address} className="text-center bg-white text-black hover:bg-blue-300">
        <td
          className="text-[8px] xs:text-[11px] md:text-[16px]
        p-[5px] md:px-4 md:py-2 border-r-2 border-black"
        >
          #{rank}
        </td>
        <td
          className="text-[8px] text-[11px] md:text-[16px]
        p-[5px] md:px-4 md:py-2 border-r-2 border-black"
        >
          <button type="button" onClick={() => setIsExpanded(!isExpanded)}>
            {numberOwned}ETH
          </button>
        </td>
        <td
          className="flex items-center justify-center gap-[2px] md:gap-3 
        w-full
        text-[8px] text-[11px] md:text-[16px]
        p-[5px] md:px-4 md:py-2 border-r-2 border-black"
        >
          <a
            href={`https://zora.co/${ensName || address}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3"
          >
            <Zorb address={address} width={25} height={25} />
            {ensName || truncateEthAddress(address)}
          </a>
        </td>
      </tr>
      {isExpanded &&
        getChainBreakdowns({
          ethereumReward,
          optimismReward,
          baseReward,
          zoraReward,
        }).map((chain) => (
          <ChainRow
            address={address}
            icon={chain.icon}
            key={chain.chainSymbol}
            symbol={chain.chainSymbol}
            amount={chain.amount}
          />
        ))}
    </>
  )
}

export default LeaderboardRow
