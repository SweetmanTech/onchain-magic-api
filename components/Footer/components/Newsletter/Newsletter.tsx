import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-toastify"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const isMintPage = useRouter().pathname.includes("/mint")

  const handleClick = async () => {
    await axios.post("/api/newsletter", { email })
    toast.success("Subscribed!")
    setEmail("")
  }
  const onChange = (e) => {
    setEmail(e.target.value)
  }

  return (
    <div className="flex flex-col items-start pl-4 md:p-0 md:block col-span-4 md:col-span-1">
      <div
        className={`font-quicksand text-[8px] md:text-[16px] ${
          !isMintPage && "dark:text-[white]"
        } text-[black]`}
      >
        Join our newsletter
      </div>
      <div
        className="relative p-0 
      w-[100px] md:w-[250px]
      flex items-center justify-between
      bg-white
      px-[4px] md:px-[15px]
      border-[1px] border-[black] 
      rounded-[10px] md:rounded-[20px]
      overflow-hidden"
      >
        <input
          className="text-[5px] md:text-[12px] 
          border-none
          font-quicksand 
          focus:ring-0
          px-0
          flex-grow
          py-[0px] md:py-1
          h-[15px] md:h-[30px]"
          placeholder="Email Address"
          onChange={onChange}
          value={email}
        />
        <button
          type="button"
          className="bg-[black]
            cursor-pointer
            px-1 py-[1px] 
            md:px-2 md:py-[1px] 
            rounded-[2rem] 
            text-[white] text-[5px] md:text-[10px]"
          onClick={handleClick}
          disabled={!!(email.length === 0 || !email.includes("@"))}
        >
          SUBMIT
        </button>
      </div>
    </div>
  )
}

export default Newsletter
