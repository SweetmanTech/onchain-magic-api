import { useFormContext } from 'react-hook-form'

interface ITextArea {
  id: string
  name?: string
  value?: string
  className?: string
  onChange?: (e: any) => any
  placeholder?: string
  hookToForm: boolean
}

function TextArea({
  id,
  name,
  value,
  placeholder,
  onChange,
  className,
  hookToForm
}: ITextArea) {
  const formContext = useFormContext()
  const isFullyHooked = name && hookToForm && formContext

  const fieldError =
    isFullyHooked && formContext?.formState?.errors?.[name]

  return (
    <div
      id={id}
      className="w-full rounded-[10px] overflow-hidden"
    >
      <textarea
        placeholder={placeholder}
        className={`border-none
                  text-black 
                  bg-[#F2F2F2]
                  h-full
                  focus:ring-0
                  shadow-[0px_2px_2px_rgba(0,0,0,0.25)] dark:shadow-[0px_2px_2px_2px_rgba(255,255,255,0.25)]
                  bg-[#F2F2F2]
                  ${className || ""}
                `}
        name={name}
        {...(isFullyHooked
          ? formContext.register(name, {
              onChange: e => onChange && onChange(e)
            })
          : {})}
        value={value}
      />
      {isFullyHooked && fieldError && fieldError?.message && (
        <p className='text-red-600 font-quicksand text-[12px] pt-[10px]'>
          {fieldError?.message as string}
        </p>
      )}
    </div>
  )
}

TextArea.defaultProps = {
  hookToForm: false,
}

export default TextArea
