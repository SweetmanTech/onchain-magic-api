import { InputHTMLAttributes } from "react"
import TickSvg from "./tick.svg"
import Image from "next/image"

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  id: string
  label?: string
}

const Checkbox = ({ checked, onChange, id, className, label }: ICheckbox) => {
  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        hidden
        id={id}
        className="hidden"
      />
      <label htmlFor={id} className="cursor-pointer flex gap-x-[10px] items-center">
        <div
          className={`w-[18px] h-[18px] relative border-[2px] border-[white] rounded-[5px]
                ${checked ? "bg-[#FAC103]" : ""}
                ${className || ""}`}
        >
          {checked && (
            <div className="absolute top-[-6px] right-[-5px]">
              <Image src={TickSvg.src} width={20} height={17} alt="tick image" />
            </div>
          )}
        </div>
        {label && <pre className="text-white text-[25px] font-bold font-quicksand">{label}</pre>}
      </label>
    </>
  )
}

export default Checkbox
