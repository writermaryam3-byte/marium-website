"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import { useActionState, useEffect } from "react";
import { addCategory } from "../_actions/category";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";

type InitialStateType = {
  message?: string;
  error?: ValidationError;
  status?: number | null;
};
const initialState: InitialStateType = {
  message: "",
  error: {},
  status: null,
};
function Form() {
  const [state, action, pending] = useActionState(addCategory, initialState);

  useEffect(() => {
    if (state.status === 201) {
      toast.success(state?.message)
    }
    else if (state.status && state.message) {
      toast.error(state.message)
    }
  }, [ state.message, state.status, state]);
  return (
    <form className="my-5" action={action}>
      <div className="space-y-2">
        <Label htmlFor="name">
          اسم الفئة
        </Label>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="اضف اسم الفئة"
          />
          <Button className="cursor-pointer" type="submit" size="lg" disabled={pending}>
            {pending ? <Loader /> : "اضافة"}
          </Button>
        </div>
        {state.error?.name && (
          <p className="text-sm text-destructive">{state.error.name}</p>
        )}
      </div>
    </form>
  );
}

export default Form;