import Image from "next/image"
import { useEffect, useState, FC } from "react"

interface Props {
  src?: string
  fallbackSrc: string
  width: number
  height: number
  className?: string
}

const ImageFallback: FC<Props> = ({ src, fallbackSrc, width, height, className, ...rest }) => {
  const [imgSrc, set_imgSrc] = useState(src)

  useEffect(() => {
    set_imgSrc(src)
  }, [src])

  return (
    <Image
      {...rest}
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          set_imgSrc(fallbackSrc)
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc)
      }}
      alt="Profile picture"
      width={width}
      height={height}
      className={`${className || ""}`}
    />
  )
}

export default ImageFallback
