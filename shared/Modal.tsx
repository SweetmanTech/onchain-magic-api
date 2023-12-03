import React, { ReactNode } from "react"

interface IModal {
  id: string
  onClose: () => any
  showCloseButton?: boolean
  children: ReactNode
  isVisible: Boolean
  containerClassName?: string
  closeButtonClassName?: string
  modalClassName?: string
}

const Modal = ({
  id,
  onClose,
  showCloseButton,
  children,
  isVisible,
  modalClassName,
  containerClassName,
  closeButtonClassName,
}: IModal) => (
  <div
    className={`fade_modal
        fixed top-0 left-0 w-screen h-screen items-center justify-center z-40
        xl:pt-0 pt-[80px]
        ${isVisible ? "flex" : "hidden"}
        ${modalClassName || ""}
      `}
    onClick={async (e) => (e.target === e.currentTarget && onClose ? await onClose() : () => {})}
  >
    <div className={`mt-[50px] bg-white rounded-lg relative ${containerClassName || ""}`}>
      {showCloseButton && (
        <div
          className={`bg-white dark:bg-[black] absolute 
            top-[5px] right-[5px] xl:top-[15px] xl:right-[15px] 
            w-6 h-6 rounded-full cursor-pointer
            flex justify-center items-center z-[5] ${closeButtonClassName || ""}`}
        >
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClose}
          >
            <line
              x1="2.84836"
              y1="1.77502"
              x2="10.273"
              y2="9.19965"
              stroke={`url(#paint0_linear_${id})`}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="2.72705"
              y1="9.1996"
              x2="10.1517"
              y2="1.77498"
              stroke={`url(#paint1_linear_${id})`}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id={`paint0_linear_${id}`}
                x1="5.50001"
                y1="6.548"
                x2="4.7929"
                y2="7.2551"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.40625" stopColor="white" />
                <stop offset="0.578125" stopColor="#8D8DDA" />
              </linearGradient>
              <linearGradient
                id={`paint1_linear_${id}`}
                x1="7.50002"
                y1="6.54795"
                x2="8.20713"
                y2="7.25506"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.40625" stopColor="white" />
                <stop offset="0.578125" stopColor="#8D8DDA" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
      {children}
    </div>
  </div>
)

export default Modal
