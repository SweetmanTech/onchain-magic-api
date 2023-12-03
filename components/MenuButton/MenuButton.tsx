import { useRouter } from "next/router"

const MenuButton = ({ toggleMenu }) => {
  const isMintPage = useRouter().pathname.includes("/mint")

  return (
    <button
      type="button"
      className="flex flex-col justify-center items-center space-y-[5px] w-[50px] h-[40px] rounded-lg cursor-pointer"
      onClick={toggleMenu}
    >
      <hr
        className={`w-[19px] h-0.5 border-[1.25px] border-black ${
          !isMintPage && "dark:border-white"
        } bg-none`}
      />
      <hr
        className={`w-[19px] h-0.5 border-[1.25px] border-black ${
          !isMintPage && "dark:border-white"
        }`}
      />
      <hr
        className={`w-[19px] h-0.5 border-[1.25px] border-black ${
          !isMintPage && "dark:border-white"
        }`}
      />
    </button>
  )
}
export default MenuButton
