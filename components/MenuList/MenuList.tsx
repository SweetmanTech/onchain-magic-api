import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import CustomConnectWallet from "../CustomConnectWallet"
import { useTheme } from "../../providers/ThemeProvider"
import { ToggleButton } from "../../shared/Button"

const MenuList = ({ toggleMenu }) => {
  const { onChangeThemeConfig, themeMode } = useTheme()

  const router = useRouter()
  const isMintPage = router.pathname.includes("/mint")

  const isHidden = isMintPage || router.pathname.includes("/staking")

  const [isDarkMode, setIsDarkMode] = useState(false)
  const { isConnected } = useAccount()

  const menuItemClassName = `ml-4 ${
    !isMintPage && "dark:text-[black]"
  } text-white cursor-pointer text-[14px]`

  const onToggle = () => {
    setIsDarkMode(!isDarkMode)
    onChangeThemeConfig()
  }

  useEffect(() => {
    setIsDarkMode(themeMode !== "light")
  }, [themeMode])

  return (
    <div
      className={`fixed right-2 top-2 z-200 
      uppercase 
      font-quicksand
      flex flex-col items-left 
      justify-between gap-y-[12px] p-4 
      no-scrollbar
      ${
        !isMintPage && "dark:bg-white"
      } bg-[black] to-90% rounded-lg md:text-lg w-[200px] h-[490px] overflow-y-scroll`}
    >
      <div
        className={`${!isMintPage && "dark:bg-[black]"} bg-white absolute top-2 right-2
          w-6 h-6 m-2 rounded-full`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke={`${isDarkMode && !isMintPage ? "white" : "black"}`}
          onClick={toggleMenu}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="pt-8">
        <CustomConnectWallet />
      </div>
      <Link href="/mint" target="_blank" rel="noreferrer">
        <div className={`font-bold ${!isMintPage && "dark:text-[black]"} text-white`}>Mint</div>
      </Link>
      <div className={`font-bold ${!isMintPage && "dark:text-[black]"} text-white`}>Explore</div>
      <a href="https://everythingcorp.cre8ors.com/mysteries" target="_blank" rel="noreferrer">
        <div className={menuItemClassName}>Everything Corp</div>
      </a>
      <Link href="/manifesto" target="_blank" rel="noreferrer">
        <div className={menuItemClassName}>Manifesto</div>
      </Link>
      {isConnected ? (
        <Link href="/profile" target="_blank" rel="noreferrer">
          <div className={menuItemClassName}>Profile</div>
        </Link>
      ) : (
        <div className="ml-4 text-gray-400 cursor-not-allowed">Profiles</div>
      )}
      <a
        href="https://mirror.xyz/sweetman.eth/gKpHCW-6wviwbQn_zzG7vQDZ-TxoV9GwWFdXaT_QzC4"
        target="_blank"
        rel="noreferrer"
      >
        <div className={menuItemClassName}>ERC721H</div>
      </a>
      <Link href="/checkpassport" target="_blank" rel="noreferrer">
        <div className={menuItemClassName}>CHECK</div>
      </Link>
      <Link href="/teams" target="_blank" rel="noreferrer">
        <div className={menuItemClassName}>Team</div>
      </Link>
      <Link href="/faq" target="_blank" rel="noreferrer">
        <div className={menuItemClassName}>FAQ</div>
      </Link>
      <div className={`font-bold ${!isMintPage && "dark:text-[black]"} text-white`}>
        Collections
      </div>
      <a href="https://opensea.io/collection/cre8orsaipeps" target="_blank" rel="noreferrer">
        <div className={menuItemClassName}>Cre8ors</div>
      </a>
      <a href="https://opensea.io/collection/cre8ors-dna" target="_blank" rel="noreferrer">
        <div className={menuItemClassName}>Dna cards</div>
      </a>
      <a href="https://opensea.io/collection/cre8ors-passports" target="_blank" rel="noreferrer">
        <div className={menuItemClassName}>Passports</div>
      </a>
      <a
        href="https://opensea.io/collection/cre8ors-claim-tickets"
        target="_blank"
        rel="noreferrer"
      >
        <div className={menuItemClassName}>Tickets</div>
      </a>
      <a href="https://opensea.io/collection/cre8ors-relics" target="_blank" rel="noreferrer">
        <div className={menuItemClassName}>Relics</div>
      </a>
      <div className="flex flex-row items-center justify-around">
        <a href="https://twitter.com/Cre8orsNFT" target="_blank" rel="noreferrer">
          <div className="pt-2 cursor-pointer ">
            <Image
              src={`${
                themeMode === "dark" && !isMintPage
                  ? "/assets/Header/new_twitter.png"
                  : "/assets/Header/white_twitter.png"
              }`}
              width={19}
              height={19}
              alt="twitter"
            />
          </div>
        </a>
        {!isHidden && (
          <div className="flex items-center font-quicksand font-bold border-[1px] rounded-[20px] border-[gray]">
            <ToggleButton onClick={onToggle} value={isDarkMode} id="light_dark_switch" />
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuList
