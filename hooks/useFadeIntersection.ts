import { useState, useEffect } from "react"

import { useTheme } from "../providers/ThemeProvider"

interface Props {
  ref: React.RefObject<HTMLDivElement>
}

const useFadeIntersection = ({ ref }: Props) => {
  const { themeMode } = useTheme()

  const [injected, setInjected] = useState(false)

  useEffect(() => {
    if (ref?.current && !injected) {
      const cb = (entries) => {
        entries.map((entry: any) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("inview")
          } else {
            entry.target.classList.remove("inview")
          }
        })
      }
      const io = new IntersectionObserver(cb)
      io.observe(ref.current)
      setInjected(true)
    }
  }, [ref])

  useEffect(() => {
    if (ref?.current) {
      if (ref.current?.classList) {
        ref.current.classList.add("no_transition")
        setTimeout(() => {
          if (ref.current?.classList) ref.current.classList.remove("no_transition")
        }, 1000)
      }
    }
  }, [themeMode])
}

export default useFadeIntersection
