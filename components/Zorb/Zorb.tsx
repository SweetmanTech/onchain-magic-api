import Image from "next/image"
import useZorbImage from "../../hooks/useZorbImage"

const Zorb = ({ address = "", width = 50, height = 50 }) => {
  const { zorbImage } = useZorbImage(address)

  return (
    <Image src={zorbImage} alt="zorb" width={width} height={height} className="cursor-pointer" />
  )
}

export default Zorb
