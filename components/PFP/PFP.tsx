import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import retryGetEns from "../../lib/retryGetEns"
import customLoader from "../../lib/customLoader"

/* eslint-disable @next/next/no-img-element */
const PFP = ({ address, width = 100, height = 100 }: any) => {
  const [avatar, setAvatar] = useState("/CRE8ORSLOGO_ICON.png")

  useEffect(() => {
    const init = async () => {
      const ensRecord = await retryGetEns(address)
      if (!ensRecord?.title) return
      let uri = `https://metadata.ens.domains/mainnet/avatar/${ensRecord.title}`
      try {
        await axios.get(uri)
      } catch {
        uri = ensRecord.metadata.image
      }
      setAvatar(uri)
    }

    if (!address) return
    init()
  }, [address])

  return (
    <Image
      src={avatar}
      alt="pfp"
      width={width}
      height={height}
      className="rounded"
      loader={customLoader}
    />
  )
}

export default PFP
