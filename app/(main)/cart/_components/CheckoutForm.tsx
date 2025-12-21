"use client";

import { FormTypes, InputTypes, Routes } from "@/app/types/enums";
import useFormFields from "@/hooks/useFormFields";
import { Session } from "next-auth";
import FormFields from "@/components/formFields/formFields";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import { FEE, getTotalPrice } from "@/lib/cart";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import Link from "@/components/link";

const CheckoutForm = ({ user = {} }: { user: Session["user"] | any }) => {
  const cart = useAppSelector(selectCartItems);

  const { getFormFields } = useFormFields({ slug: FormTypes.CHECKOUT });
  return (
    <>
      {cart.length > 0 && (
        <div className="flex-1 flex flex-col gap-5 bg-black/60 px-10 py-5 mb-5 rounded-3xl">
          <h2 className="text-3xl font-bold">الدفع</h2>
          <form>
            <div className="flex flex-col gap-4">
              {getFormFields().map((field) => {
                const fieldValue =
                  user[field.name] ??
                  "";
                return (
                  <FormFields
                    key={field.name}
                    {...field}
                    error={{}}
                    readOnly={
                      field.name === InputTypes.EMAIL || field.name === "phone"
                    }
                    defaultValue={fieldValue}
                  />
                );
              })}
            </div>
            <Link href={Routes.CHECKOUT}>
              <Button className="w-full cursor-pointer mt-4 rounded-full">
                الذهاب للدفع {formatCurrency(getTotalPrice(cart) + FEE)}
              </Button>
            </Link>
          </form>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
