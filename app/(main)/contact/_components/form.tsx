"use client";
import { Button } from "@/components/ui/button";
import useFormFields from "@/hooks/useFormFields";
import { FormTypes, Routes } from "@/app/types/enums";
import { IFormField } from "@/app/types/interfaces";
import FormFields from "@/components/formFields/formFields";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";
import { contactSchema } from "@/validations/contact";
import z from "zod";
import sendEmail from "@/lib/sendEmails";
const Form = () => {
  const [error, setError] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { getFormFields } = useFormFields({ slug: FormTypes.CONTACT });
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
      const validationRes = contactSchema.safeParse(
        Object.fromEntries(formData.entries())
      );
      if (!validationRes.success) {
        setError(z.flattenError(validationRes.error).fieldErrors);
        console.log("not valid",
        z.flattenError(validationRes.error).fieldErrors

        )
        return;
      }
      const res = await sendEmail({
        from: "onboarding@resend.dev",
        to: "ziadzayd79@gmail.com",
        subject: `رسالة من ${validationRes.data.username}`,
        replyTo: validationRes.data.email,
        html: `<p>${validationRes.data.message}</p>`,
      });
      if (res.success) {
        toast.success(res.message);
        return;
      } else {
        toast.error(res.message);
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
        {isLoading ? <Loader /> : "ارسال"}
      </Button>
    </form>
  );
};

export default Form;
