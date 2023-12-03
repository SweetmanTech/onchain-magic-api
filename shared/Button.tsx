import { FC, ReactNode, useState, useEffect } from "react"
import { classNames } from "./Utils"

interface ButtonProps {
  id: string
  children?: ReactNode
  className?: string
  type?: "button" | "submit" | "reset" | undefined
  onClick?: (e: any) => void
  disabled?: boolean
  hasDoubleAnimation?: boolean
}

interface ToggleButtonProps {
  id: string
  onClick?: () => void
  children?: ReactNode
  value?: boolean
}

export const Button: FC<ButtonProps> = ({
  id,
  children,
  className,
  onClick,
  hasDoubleAnimation,
  type,
  ...rest
}) => {
  const hoverEvent = () => {
    if (hasDoubleAnimation) {
      const element = document.getElementsByClassName(`${id}_all`)

      for (let i = 0; i < element.length; i++) {
        element[i].setAttribute("style", "transform:scale(1.1)")
      }
    }
  }

  const leaveEvent = () => {
    if (hasDoubleAnimation) {
      const element = document.getElementsByClassName(`${id}_all`)

      for (let i = 0; i < element.length; i++) {
        element[i].setAttribute("style", "transform:scale(1)")
      }
    }
  }

  return (
    <button
      id={id}
      type={type || "button"}
      className={`${id}_all hover:scale-[1.1] scale-[1] transition duration-[300ms] px-[28px] py-[11px] font-bold font-quicksand 
        uppercase text-white dark:text-[black] rounded bg-[black] dark:bg-[white] 
        shadow-[0px_4px_4px_rgb(0,0,0,0.25)] dark:shadow-[0px_4px_4px_rgb(255,255,255,0.25)]
        flex items-center justify-center gap-[10px]
        ${className || ""}`}
      onClick={onClick}
      onMouseOver={hoverEvent}
      onMouseOut={leaveEvent}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  hasDoubleAnimation: false,
}

export const PageButton: FC<ButtonProps> = ({ children, className, ...rest }) => (
  <button
    type="button"
    className={classNames(
      "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
      className,
    )}
    {...rest}
  >
    {children}
  </button>
)

export const ToggleButton: FC<ToggleButtonProps> = ({ onClick, value }) => {
  const [isToggle, setIsToggle] = useState(false)

  useEffect(() => {
    setIsToggle(value)
  }, [value])

  return (
    <div className="flex justify-center w-16 h-6 cursor-pointer">
      <div
        className="flex items-center dark:bg-[white] bg-[black] rounded-full w-full h-6 pl-2"
        onClick={onClick}
      >
        <div
          className={`${isToggle ? "translate-x-[calc(100%+11px)]" : "translate-x-[-5px]"} 
            dark:bg-[black]
            bg-[white] w-5 h-5 rounded-full 
            transition duration-[300ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]`}
        />
      </div>
    </div>
  )
}
