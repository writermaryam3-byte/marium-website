"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "lucide-react";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import { useActionState, useEffect } from "react";
import { updateCategory } from "../_actions/category";
import { Category } from "@/lib/generated/prisma/client";
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

function EditCategory({ category }: { category: Category }) {
  const [state, action, pending] = useActionState(
    updateCategory.bind(null, category.id),
    initialState
  );

  useEffect(() => {
    if (state.status === 200) {
      toast.success(state?.message);
    } else if (state.status && state.message) {
      toast.error(state.message);
    }
  }, [state.message, state.status, state]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={"text-right!"}>تعديل الفئة</DialogTitle>
        </DialogHeader>
        <form action={action} className="pt-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="category-name">اسم الفئة</Label>
            <div className="flex-1 relative">
              <Input
                type="text"
                id="categoryName"
                name="categoryName"
                defaultValue={category.name}
                placeholder="ادخل اسم الفئة"
              />
              {state.error?.categoryName && (
                <p className="text-sm text-destructive absolute top-12">
                  {state.error?.categoryName}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-10">
            <Button type="submit" disabled={pending}>
              {pending ? <Loader /> : "تحديث"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategory;
