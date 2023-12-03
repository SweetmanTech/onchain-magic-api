import { useEffect } from "react"

interface Props {
  ref: any
  isEnabled?: boolean
  isForever?: boolean
}

const useShakeEffect = ({ ref, isEnabled, isForever }: Props) => {
  useEffect(() => {
    const refCurrent = ref.current

    const handleShakeEffect = (event: any) => {
      const currentTarget = event?.currentTarget

      if (currentTarget) {
        if (isEnabled) currentTarget.style.animation = "shake 0.3s ease-in-out"
        setTimeout(() => {
          currentTarget.style.animation = ""
        }, 300)
      }
    }

    if (isEnabled && refCurrent) {
      refCurrent.addEventListener("click", handleShakeEffect)
    } else if (!isEnabled && refCurrent) {
      refCurrent.removeEventListener("click", handleShakeEffect)
    }

    if (isForever && refCurrent) {
      refCurrent.style.animation = "shake 3s infinite ease-in-out"
    } else if (!isForever && refCurrent) {
      refCurrent.style.animation = ""
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener("click", handleShakeEffect)
        refCurrent.style.animation = ""
      }
    }
  }, [isEnabled, isForever, ref])
}

export default useShakeEffect
