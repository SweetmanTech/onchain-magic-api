import { useState } from "react"

const useMintCart = () => {
  const [cart, setCart] = useState<number[]>([0, 0, 0]) // Initialize with three zeros

  const addToCart = (type: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart]
      newCart[type - 1] = (newCart[type - 1] || 0) + 1
      return newCart
    })
  }

  const removeFromCart = (type: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart]
      if (newCart[type - 1] && newCart[type - 1] > 0) {
        newCart[type - 1] -= 1
      }
      return newCart // No filter, keep zeros
    })
  }

  const getCartTier = (tierNumber: number) => {
    return cart[tierNumber - 1] || 0
  }

  return { cart, addToCart, removeFromCart, getCartTier }
}

export default useMintCart
