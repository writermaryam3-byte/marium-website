"use client"
import { CourseInCart } from "@/app/types/interfaces";
import { Course } from "@/lib/generated/prisma/client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type CartContextType = {
  cart: CourseInCart[];
  setCart: Dispatch<SetStateAction<CourseInCart[]>>;
};

export const CartContext = createContext<CartContextType | null>(null);

export default function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartContext.Provider");
  }

  return context;
}
