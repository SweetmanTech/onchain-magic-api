import { useEffect, useState } from "react"
import getEthPrice from "../lib/getEthPrice"

const useEthPrice = () => {
  const [ethPrice, setEthPrice] = useState()

  useEffect(() => {
    const init = async () => {
      const response = await getEthPrice()
      setEthPrice(response)
    }
    init()
  }, [])

  return { ethPrice }
}

export default useEthPrice
