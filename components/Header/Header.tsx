import { FC } from "react"
import Link from "next/link"
import CustomConnectWallet from "../CustomConnectWallet"
import Zorb from "../Zorb"

interface HeaderProps {
  connect?: boolean
}
const Header: FC<HeaderProps> = () => (
  <nav
    className="fixed top-0 z-50 w-screen
       bg-transparent 
      flex justify-center"
    id="header_nav_bar"
  >
    <div
      className={`flex flex-row items-center justify-between 
        w-[1280px]
        px-8 md:px-5 lg:px-16
        lg:pt-8 lg:pb-3
        md:pb-2 md:pt-6
        py-4`}
    >
      <span className="relative items-center flex-shrink-0 w-20 mr-6 cursor-auto lg:md:mt-6 lg:mt-0 lg:md:w-36 lg:flex">
        <Link href="/">
          <div className="relative">
            <Zorb />
          </div>
        </Link>
      </span>

      <div
        className="text-sm font-quicksand 
        flex flex-row items-center
        md:gap-x-[20px] xl:gap-x-[30px]"
      >
        <CustomConnectWallet />
      </div>
    </div>
  </nav>
)

export default Header
