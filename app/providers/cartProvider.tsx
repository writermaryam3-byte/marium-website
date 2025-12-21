"use client"
import React, { ReactNode, useState } from 'react'
import { CartContext } from '@/hooks/useCart'

import { CourseInCart } from '../types/interfaces'
export const getCart = () => JSON.parse(localStorage.getItem("cart")||"[]")

const CartProvider = ({children}: {children: ReactNode}) => {
  const [cart, setCart] = useState<CourseInCart[]>(getCart)

  
    return (
    <CartContext.Provider value={{cart, setCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider