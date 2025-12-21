"use client";
import Image from "next/image";
import BasicForm from "./BasicForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import Motion from "../ui/motion";
import { Pages, Routes } from "@/app/types/enums";
const LoginForm = () => {
  const loginSchema = z.object({
    phone: z.string("الرجاء ادخال رقم هاتف صالح!"),
    password: z
      .string("هذا الحقل لا يجب ان يكون فارغا")
      .min(8, "كلمة المرور غير صحيحة"),
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = true;
    if (res) {
      toast.success("login successfully");
      redirect("/");
    } else {
      toast.error("error");
    }
  }
  return (
    <Motion
    className="basis-70/100"
      init={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
    >
      <BasicForm
        btn={{
          lable: "تسجيل الدخول",
          classNames: "w-full cursor-pointer",
          disabled: false,
        }}
        formOptions={{
          logo: (
            <Link className="mx-auto mb-5 block w-fit" href={Routes.ROOT}>
              <div className="relative w-40 h-40 animate-[spin_5s_linear_infinite]">
                <Image
                  fill
                  className="object-contain"
                  src={"/logo.svg"}
                  alt="logo"
                  loading="eager"
                  priority
                />
              </div>
            </Link>
          ),
          form: form,
          onSubmit: onSubmit,
          classNames: "bg-black/60 rounded-2xl p-5",
          footer: (
            <p className="text-center">
              ليس لديك حساب ؟!
              <Link className="text-button hover:underline" href={`${Routes.AUTH}/${Pages.Register}`}>
                سجل معنا الان !
              </Link>
            </p>
          ),
        }}
        fieldSet={[
          {
            label: "الهاتف",
            placeholder: "ادخل رقم الهاتف",
            name: "phone",
            type: "phone",
          },
          {
            label: "كلمة المرور",
            placeholder: "ادخل كلمة المرور",
            name: "password",
            type: "password",
          },
        ]}
      />
    </Motion>
  );
};

export default LoginForm;
