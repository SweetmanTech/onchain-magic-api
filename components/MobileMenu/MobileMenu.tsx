import { useState } from "react"
import MenuButton from "../MenuButton"
import MenuList from "../MenuList"

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  return (
    <>
      <MenuButton toggleMenu={toggleMenu} />
      {isMenuOpen && <MenuList toggleMenu={toggleMenu} />}
    </>
  )
}

export default MobileMenu
