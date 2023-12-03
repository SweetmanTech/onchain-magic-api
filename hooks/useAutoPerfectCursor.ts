import { MotionValue } from "framer-motion"
import { useEffect } from "react"
import { useLocalStorage } from "usehooks-ts"

interface Props {
  containerRef: React.RefObject<HTMLDivElement>
  cursorRef: React.RefObject<HTMLDivElement>
  clipRef: React.RefObject<HTMLImageElement>
  scrollY: MotionValue<number>
}

let posX = 0
let posY = 0
let prevScrollPos = 0
let isAnimating = false

const useAutoPerfectCursor = ({ containerRef, cursorRef, clipRef, scrollY }: Props) => {
  const CURSOR_RADIUS = 150 / 2

  const [isScrollUp, setIsScrollUp] = useLocalStorage("isScrollUp", false)

  const animationEffect = (event?: MouseEvent) => {
    if (isAnimating) return

    isAnimating = true
    if (cursorRef.current && clipRef.current) {
      const x = (event?.clientX || posX) - CURSOR_RADIUS
      const y = (event?.clientY || posY) + scrollY.get() - CURSOR_RADIUS
      const clipX = event?.clientX || posX
      const clipY = (event?.clientY || posY) + scrollY.get()

      cursorRef.current.style.display = "block"
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`
      clipRef.current.style.clipPath = `circle(${CURSOR_RADIUS}px at ${clipX}px ${clipY}px)`
      clipRef.current.style.opacity = "1"

      if (event) {
        posX = event.clientX
        posY = event.clientY
      }
    }

    setTimeout(() => {
      isAnimating = false
    }, 20)
  }

  const removeAllEventListener = () => {
    if (containerRef.current) {
      containerRef.current.removeEventListener("mousemove", () => {})
      containerRef.current.removeEventListener("mouseenter", () => {})
      containerRef.current.removeEventListener("mouseleave", () => {})
    }
  }

  useEffect(() => {
    if (cursorRef?.current && clipRef?.current && containerRef?.current && scrollY) {
      removeAllEventListener()
      scrollY.clearListeners()

      scrollY.on("change", () => {
        animationEffect()

        if (scrollY.get() > prevScrollPos) setIsScrollUp(true)
        else if (scrollY.get() < prevScrollPos) setIsScrollUp(false)

        prevScrollPos = scrollY.get()

        let fade_bg_sections = document.querySelectorAll(".fade_bg")
        for (let i = 0; i < fade_bg_sections.length; i++) {
          let section = fade_bg_sections[i]

          if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add("show")
          } else {
            section.classList.remove("show")
          }
        }
      })

      containerRef.current.addEventListener("mousemove", (event: MouseEvent) => {
        animationEffect(event)
      })

      containerRef.current.addEventListener("mouseenter", (event: MouseEvent) => {
        animationEffect(event)
      })

      containerRef.current.addEventListener("mouseleave", () => {
        if (cursorRef.current) {
          cursorRef.current.style.display = "none"

          clipRef.current.style.clipPath = `none`
          clipRef.current.style.opacity = "0"
        }
      })
    }
  }, [cursorRef, clipRef, containerRef])

  return {
    isScrollUp,
  }
}

export default useAutoPerfectCursor
