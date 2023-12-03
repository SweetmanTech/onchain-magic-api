import { Contract } from "ethers"
import { useCallback, useEffect, useMemo, useState } from "react"
import abi from "../lib/abi-zora-drop.json"
import getDefaultProvider from "../lib/getDefaultProvider"

const useSaleStatus = () => {
  const [presaleActive, setPresaleActive] = useState<any>(null)
  const [presaleStart, setPresaleStart] = useState(0)
  const [publicSaleActive, setPublicSaleActive] = useState<any>(null)
  const [publicSaleStart, setPublicSaleStart] = useState(0)
  const [publicSalePrice, setPublicSalePrice] = useState("0")
  const [loading, setLoading] = useState(true)
  const cre8orsContract = useMemo(
    () =>
      new Contract(
        process.env.NEXT_PUBLIC_DROP_ADDRESS,
        abi,
        getDefaultProvider(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)),
      ),
    [],
  )

  const initializeStatus = useCallback(async () => {
    setPresaleActive(null)
    setPublicSaleActive(null)
    setPublicSaleStart(0)
    setPublicSaleActive(0)

    setLoading(true)
    const details = await cre8orsContract.saleDetails()
    setPublicSaleActive(details.publicSaleActive)
    setPresaleActive(details.presaleActive)
    setPresaleStart(Math.floor(parseInt(details.presaleStart, 10) / 1000000))
    setPublicSaleStart(Math.floor(parseInt(details.publicSaleStart, 10) / 1000000))
    setPublicSalePrice(details.publicSalePrice.toString())
    setLoading(false)
  }, [cre8orsContract])

  useEffect(() => {
    initializeStatus()
  }, [cre8orsContract, initializeStatus])

  return {
    loadingSaleStatus: loading,
    presaleStart,
    presaleActive,
    publicSaleActive,
    publicSaleStart,
    publicSalePrice,
    initializeStatus,
  }
}

export default useSaleStatus
