import { useEffect, useState } from "react"
import { base, optimism, zora } from "@wagmi/core/chains"
import { useNetwork } from "wagmi"
import { getRewardsDepositEventsByCreateReferral } from "../lib/getRewardsDepositEventsByCreateReferral"

const useOnchainMagic = () => {
  const { chain } = useNetwork()
  const [loading, setLoading] = useState(false)
  const [optimismEvents, setOptimismEvents] = useState([])
  const [zoraEvents, setZoraEvents] = useState([])
  const [baseEvents, setBaseEvents] = useState([])

  useEffect(() => {
    const fetchTopCollectors = async () => {
      setLoading(true)

      const [opDrops, zoraDrops, baseDrops] = await Promise.all([
        getRewardsDepositEventsByCreateReferral(optimism.id, process.env.NEXT_PUBLIC_MINT_REFERRAL),
        getRewardsDepositEventsByCreateReferral(zora.id, process.env.NEXT_PUBLIC_MINT_REFERRAL),
        getRewardsDepositEventsByCreateReferral(base.id, process.env.NEXT_PUBLIC_MINT_REFERRAL),
      ])

      setOptimismEvents(opDrops)
      setZoraEvents(zoraDrops)
      setBaseEvents(baseDrops)
      setLoading(false)
    }

    fetchTopCollectors()
  }, [chain])

  return {
    optimismEvents,
    zoraEvents,
    baseEvents,
    loading,
  }
}

export default useOnchainMagic
