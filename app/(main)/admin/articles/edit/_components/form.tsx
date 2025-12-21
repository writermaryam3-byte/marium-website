"use client";
import { FormTypes } from "@/app/types/enums";
import FormFields from "@/components/formFields/formFields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import useFormFields from "@/hooks/useFormFields";
import { ValidationErrors } from "@/validations/auth";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateArticle } from "../../_actions/actions";
import { Article, Category, Course } from "@/lib/generated/prisma/client";

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
const Form = ({ article, categories }: { article: Article|any, categories: Category[] }) => {
  const [state, action, pending] = useActionState(
    updateArticle.bind(null, article.id),
    initialState
  );
  const { getFormFields } = useFormFields({ slug: FormTypes.ADDARTICLE });
  useEffect(() => {
    if (state.status === 200) {
      toast.success(state?.message);
    } else if (state.status && state.message) {
      toast.error(state.message);
    }
  }, [state.message, state.status, state]);
  return (
    <form action={action}>
      <div className="flex flex-col gap-4">
        {getFormFields().map((field) => {
          const fieldValue =
            state?.formData?.get(field.name)?.toString() || article[field.name];
          return (
            <FormFields
              key={field.name}
              {...field}
              error={state?.error}
              defaultValue={fieldValue}
              data={categories}
            />
          );
        })}
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="w-full cursor-pointer mt-4"
      >
        {pending ? <Loader /> : "اضافة مقالة"}
      </Button>
    </form>
  );
};

export default Form;
