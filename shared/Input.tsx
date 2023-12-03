import { useFormContext } from 'react-hook-form'

interface IInput {
  id: string
  name?: string
  value?: string
  className?: string
  containerClassName?: string
  onChange?: (e: any) => any
  placeholder?: string
  type: "text" | "password"
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  hasDoubleAnimation?: boolean
  hookToForm: boolean
}

function Input({
  id,
  name,
  value,
  type = "text",
  placeholder,
  onChange,
  className,
  endAdornment,
  startAdornment,
  containerClassName,
  hasDoubleAnimation,
  hookToForm
}: IInput) {
  const formContext = useFormContext()
  const isFullyHooked = name && hookToForm && formContext

  const fieldError =
    isFullyHooked && formContext?.formState?.errors?.[name]

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
    <>
      <div
        id={id}
        className={`core_input
            ${id}_all
            ${containerClassName || ""}
            w-full 
            shadow-[0px_2px_2px_rgba(0,0,0,0.25)] dark:shadow-[0px_2px_2px_2px_rgba(255,255,255,0.25)]
            bg-[#F2F2F2]  rounded-[10px]
            overflow-hidden
          `}
        onMouseOver={hoverEvent}
        onMouseOut={leaveEvent}
      >
        <div className="w-full flex overflow-hidden items-center justify-between">
          {startAdornment && <div className="px-[15px]">{startAdornment}</div>}
          <div
            className={`${endAdornment ? "rounded-tr-[0px] rounded-tr-[0px]" : ""}
                  ${startAdornment || endAdornment ? "w-[45%] xs:w-[100%]" : "!w-[100%]"}
                `}
          >
            <input
              type={type}
              placeholder={placeholder}
              className={`border-none
                        text-black 
                        bg-[#F2F2F2]
                        h-full
                        focus:ring-0
                        ${className || ""}
                      `}
              name={name}
              {...(isFullyHooked
                ? formContext.register(name, {
                    onChange: e => onChange && onChange(e)
                  })
                : {onChange: e => onChange && onChange(e)})}
              value={value}
            />
          </div>
          {endAdornment && <div>{endAdornment}</div>}
        </div>
      </div>
      {isFullyHooked && fieldError && fieldError?.message && (
          <div className='text-red-600 font-quicksand text-[12px] pt-0 md:pt-[10px]'>
            {fieldError?.message as string}
          </div>
        )}
    </>
  )
}

Input.defaultProps = {
  hookToForm: false,
  type: "text",
  hasDoubleAnimation: false,
}

export default Input
