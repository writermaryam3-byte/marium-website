"use client";

import { FormTypes, InputTypes } from "@/app/types/enums";
import useFormFields from "@/hooks/useFormFields";
import { Session } from "next-auth";
import { Loader } from "lucide-react";
import { UserRole } from "@/lib/generated/prisma/enums";
import { useActionState, useEffect, useState } from "react";
import { ValidationErrors } from "@/validations/auth";
import { updateUserProfile } from "@/server/_actions/userProfile";
import { toast } from "react-toastify";
import FormFields from "@/components/formFields/formFields";
import Checkbox from "@/components/formFields/CheckboxField";
import { Button } from "@/components/ui/button";

const EditUserForm = ({ user }: { user: Session["user"]|any }) => {
  const [isAdmin, setIsAdmin] = useState(user.role === UserRole.ADMIN);
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

  const [state, action, pending] = useActionState(
    updateUserProfile.bind(null, isAdmin),
    initialState
  );
  const { getFormFields } = useFormFields({ slug: FormTypes.EDITUSER });
  useEffect(() => {
    if (state.status === 200) {
      toast.success(state?.message);
    } else if (state.status && state.message) {
      toast.error(state.message);
    }
  }, [state.message, state.status, state]);
  return (
    <div>
      <form action={action}>
        <div className="flex flex-col gap-4">
          {getFormFields().map((field) => {
            const fieldValue =
              state?.formData?.get(field.name)?.toString() ?? user[field.name];
            return (
              <FormFields
                key={field.name}
                {...field}
                error={state.error}
                readOnly={
                  field.name === InputTypes.EMAIL || field.name === "phone"
                }
                defaultValue={fieldValue}
              />
            );
          })}
          {user.role === UserRole.ADMIN && (
            <Checkbox
              checked={isAdmin}
              label="مسؤول"
              name="isAdmin"
              onClick={() => setIsAdmin((prvState) => !prvState)}
            />
          )}
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="w-full cursor-pointer mt-4"
        >
          {pending ? <Loader /> : "تعديل"}
        </Button>
      </form>
    </div>
  );
};

export default EditUserForm;
