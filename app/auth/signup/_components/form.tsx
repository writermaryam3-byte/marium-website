"use client";
import { FormTypes, Pages, Routes } from "@/app/types/enums";
import FormFields from "@/components/formFields/formFields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import useFormFields from "@/hooks/useFormFields";
import { signup } from "@/server/_actions/auth";
import { ValidationErrors } from "@/validations/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useActionState, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const initialState: {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
  formData?: FormData | null;
} = {
  message: "",
  error: {},
  status: null,
  formData: null,
};
const Form = () => {
  const router = useRouter()
  const [state, action, pending] = useActionState(signup, initialState);
  const { getFormFields } = useFormFields({ slug: FormTypes.SIGNUP });
  useEffect(() => {
    if (state.status === 201) {
      toast.success(state?.message)
      router.replace(`${Routes.AUTH}/${Pages.LOGIN}`);
    }
    else if (state.status && state.message) {
      toast.error(state.message)
    }
  }, [ router, state.message, state.status, state]);
  return (
    <form action={action}>
      <div className="flex flex-col gap-4">
        {getFormFields().map((field) => {
          const fieldValue = state?.formData?.get(field.name)?.toString()
          return (
            <FormFields key={field.name} {...field} error={state?.error} defaultValue={fieldValue} />
          );
        })}
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="w-full cursor-pointer mt-4"
      >
        {pending ? <Loader /> : "انشاء حساب"}
      </Button>
    </form>
  );
};

export default Form;
