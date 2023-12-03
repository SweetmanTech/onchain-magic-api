import * as React from "react"
import Image from "next/image"

interface AvatarProps {
  size?: string
  url?: string
}

const styles = {
  sizes: {
    mini: 24,
    small: 36,
    medium: 48,
    large: 128,
  },
}

const Avatar: React.FC<AvatarProps> = ({ size, url }) => {
  return (
    <div
      className={`
            flex items-center
            w-[${styles.sizes[size]}px] h-[${styles.sizes[size]}px]
            rounded-full`}
    >
      {url && <Image src={url} width={styles.sizes[size]} height={styles.sizes[size]} />}
    </div>
  )
}

Avatar.defaultProps = {
  size: "medium",
}

export default Avatar
