import { FC, ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
  className?: string
}

const Container: FC<ContainerProps> = ({ children, className }) => (
  <div className={`w-[100%] flex justify-center ${className || ""}`}>
    <div className="w-[1280px]">{children}</div>
  </div>
)

export default Container
