import { CartItem } from "@/redux/features/cart/cartSlice"
export const FEE = 5.5
export const getTotalPrice = (cart: CartItem[]) => {
  return cart.reduce((total, item) => {
    return total + item.basePrice * item.quantity!
  }, 0)
}
