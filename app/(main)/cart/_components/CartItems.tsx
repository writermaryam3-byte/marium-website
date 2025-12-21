"use client";

import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CartItem,
  removeCartItem,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { FEE, getTotalPrice } from "@/lib/cart";
import { useEffect } from "react";
export const getCart = () => [];

const CartItems = () => {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  console.log(cart);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);
  const cartTsx = cart.map((course: CartItem) => {
    return (
      <li key={course.id} className="flex gap-4  items-center justify-around">
        <div className="w-30 h-30 rounded-3xl overflow-hidden relative">
          <Image
            className="object-cover"
            src={course.imgSrc || "/course.jfif"}
            fill
            alt="course-img"
          />
        </div>
        <div>
          <h4>{course.title}</h4>
          <div>
            <p>الكمية {course.quantity}</p>
            <p>
              السعر الاجمالي لهذه الدورة{" "}
              {formatCurrency(course.quantity! * course.basePrice)}
            </p>
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              dispatch(removeCartItem({ id: course.id }));
            }}
          >
            <Trash2 />
          </Button>
        </div>
      </li>
    );
  });
  return (
    <div className="flex flex-col gap-5 relative py-10">
          <h2 className="text-3xl font-bold">السلة</h2>
      
      <ul className="flex flex-col gap-6">
        {cartTsx.length !== 0 ? (
          cartTsx
        ) : (
          <p className="text-center text-3xl">السلة فارغة</p>
        )}
      </ul>
      {cart.length > 0 && (
        <div className="text-center md:text-right">
          <p>
            السعر غير شامل الضريبة{" "}
            <strong>{formatCurrency(getTotalPrice(cart))}</strong>
          </p>
          <p>
            الضريبة <strong>{formatCurrency(FEE)}</strong>
          </p>
          <p>
            اجمالي السعر المدفوع{" "}
            <strong>{formatCurrency(getTotalPrice(cart) + FEE)}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default CartItems;
