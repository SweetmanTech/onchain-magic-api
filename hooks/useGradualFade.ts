import { useEffect } from "react"

interface Props {
  elements: any[]
  isScrollUp: boolean
}

const useGradualFadeEffect = ({ elements, isScrollUp }: Props) => {
  const fadeOffset = 300

  useEffect(() => {
    elements.map((_, i: number) => {
      const element = elements[isScrollUp ? elements.length - (i + 1) : i]

      if (element?.type === "self" && element?.domObject?.style) {
        element.domObject.style.transitionDelay = `${fadeOffset * (i + 1)}ms`
      } else if (element?.type === "child" && element?.domObject?.children) {
        element.domObject.children[0].style.transitionDelay = `${fadeOffset * (i + 1)}ms`
      }
    })
  }, [isScrollUp, elements])
}

export default useGradualFadeEffect
