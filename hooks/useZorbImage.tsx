import { useMemo } from "react"
import { useAccount } from "wagmi"
import { zorbImageDataURI } from "@zoralabs/zorb"

const SWEETS = "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38"

const useZorbImage = (address) => {
  const { address: wagmiAddress } = useAccount()
  const zorbImage = useMemo(
    () => zorbImageDataURI(address || wagmiAddress || SWEETS),
    [address, wagmiAddress],
  )

  return {
    zorbImage,
  }
}

export default useZorbImage
