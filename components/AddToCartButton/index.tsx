"use client";
import React, { useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { formatCurrency } from "@/lib/formatters";
import { Course } from "@/lib/generated/prisma/client";
import { useAppDispatch } from "@/redux/hooks";
import { addCartItem } from "@/redux/features/cart/cartSlice";
const AddToCartButton = ({ product }: { product: Course }) => {
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch()
  // const [totalPrice, setTotalPrice] = useState(count * product.basePrice);
  const totalPrice = useMemo(() => {
    return count * product?.basePrice;
  }, [count]);
  function validateCountState(newValue: number) {
    return newValue >= 1;
  }
  function decrease() {
    const newValue = count - 1;
    validateCountState(newValue) && setCount(() => newValue);
  }
  function increase() {
    setCount((prv) => prv + 1);
  }

  function handleAddToCart() {
    const course = {
      id: product.id,
      title: product.title,
      quantity: count,
      imgSrc: product.image,
      basePrice: product.basePrice
    }
    dispatch(addCartItem(course))
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-button px-6 py-3 rounded-2xl cursor-pointer text-xl">
            عرض تفاصيل الشراء
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex flex-col gap-3">
            <div className="w-48 h-48 relative m-auto">
              <Image
                src={product?.image || "/course.jfif"}
                className="object-cover"
                alt={"item-img"}
                fill
              />
            </div>
            <DialogTitle className="text-center">{product?.title}</DialogTitle>
            <DialogDescription className="text-center">
              اختر الكمية المطلوبة
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 max-h-60 overflow-auto">
            <div className="flex justify-between items-center">
              <h5>الكمية</h5>
              <div>
                <Button variant={"ghost"} onClick={increase}>
                  <FaPlus />
                </Button>
                <span className="px-4">{count}</span>
                <Button variant={"ghost"} onClick={decrease}>
                  <FaMinus />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col!">
            <Button onClick={handleAddToCart} type="submit">
              اضف للسلة {formatCurrency(totalPrice)}
            </Button>
            {/* <Button type="submit" className="bg-button">
              اشتر الان {formatCurrency(totalPrice)}
            </Button> */}
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddToCartButton;
