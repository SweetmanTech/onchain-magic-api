import Image from 'next/image'
import { DetailedHTMLProps, VideoHTMLAttributes, useRef, useState } from 'react'

interface IMedia {
  type: "video" | "image"
  link?: string
  posterLink?: string
  containerStyle?: any
  containerClasses?: string
  className?: string
  videoProps?: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
  blurLink?: string
  alt?: string
}

function Media({
  type,
  link,
  className,
  videoProps,
  containerClasses,
  containerStyle,
  blurLink,
  posterLink,
  alt
}: IMedia) {
  const videoRef = useRef<any>()
  const [isMuted, setIsMuted] = useState(true)

  const videoAutoPlay = () => {
    if(isMuted) {
      videoRef.current.play()
    }
    else videoRef.current.pause()

    setIsMuted(!isMuted)
  }

  return (
    <div
      className={`relative ${containerClasses || ''}`}
      style={containerStyle || {}}
      onClick={type === 'video' ? videoAutoPlay : () => {}}
    >
      {type === 'video' && link && (
        <video
          muted={isMuted}
          className={`${className || ''}`}
          {...videoProps}
          ref={videoRef}
          poster={posterLink}
        >
          <source src={link}></source>
        </video>
      )}
      {type === "image" && link && (
        <Image
          className="absolute w-[100%] h-[100%]"
          src={link}
          layout="fill"
          alt={alt || "not found image"}
          placeholder="blur"
          blurDataURL={
            blurLink ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcMXP2OQAGOQKc/DqDigAAAABJRU5ErkJggg=="
          }
          unoptimized
        />
      )}
    </div>
  )
}

export default Media
