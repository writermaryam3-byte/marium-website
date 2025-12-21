import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  title: string;
  imgSrc: string;
  quantity?: number;
  basePrice: number;
  id: string;
};
type CartState = { items: CartItem[] };
const initialCartItems = localStorage.getItem("cartItems")
const initialState: CartState = {
  items: initialCartItems?JSON.parse(initialCartItems):[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (currentState: CartState, action: PayloadAction<CartItem>) => {
      const existedItem = currentState.items.find(
        (item) => item.id === action.payload.id
      );
      if (existedItem) {
        existedItem.quantity = (existedItem.quantity || 0) + 1;
      } else {
        currentState.items.push({
          ...action.payload,
        });
      }
    },

    decreaseQuantity: (
      currentState: CartState,
      action: PayloadAction<{ id: string }>
    ) => {
      const item = currentState.items.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        if (item.quantity === 1)
          currentState.items = currentState.items.filter(
            (item) => item.id !== action.payload.id
          );
        else item.quantity! -= 1;
      }
    },
    removeCartItem: (
      currentState: CartState,
      action: PayloadAction<{ id: string }>
    ) => {
      const item = currentState.items.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        currentState.items = currentState.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    clearCart: (currentState: CartState)=>{
      currentState.items = []
    }
  },
});

export const { addCartItem, removeCartItem, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
