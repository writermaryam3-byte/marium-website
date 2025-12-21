"use client";
import { Button } from "@/components/ui/button";
import useFormFields from "@/hooks/useFormFields";
import { FormTypes, Routes } from "@/app/types/enums";
import { IFormField } from "@/app/types/interfaces";
import FormFields from "@/components/formFields/formFields";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";
const Form = () => {
  const [error, setError] = useState({});
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { getFormFields } = useFormFields({ slug: FormTypes.SIGNIN });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsLoading(true);
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {

      const res = await signIn("credentials", {
        phone: data.phone,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        const validationError = JSON.parse(res.error).validationError;
        setError(validationError);
        const responseError = JSON.parse(res.error).responseError;
        responseError && toast.error(responseError);
      } else if (res?.ok) {
        toast.success("تم تسجيل الدخول بتجاح");
        router.replace(`${Routes.PROFILE}`)
        
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <div className="flex flex-col gap-4">
        {getFormFields().map((field: IFormField) => {
          return <FormFields key={field.name} {...field} error={error} />;
        })}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer mt-4"
      >
        {isLoading ? <Loader /> : "تسجيل الدخول"}
      </Button>
    </form>
  );
};

export default Form;
