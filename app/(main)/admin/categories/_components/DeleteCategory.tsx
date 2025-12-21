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
import Loader from "@/components/ui/Loader";
import { Category } from "@/lib/generated/prisma/client";
import { DeleteIcon, Trash } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { deleteCategory } from "../_actions/category";
type InitialStateType = {
  message?: string;
  status?: number | null;
};
const initialState: InitialStateType = {
  message: "",
  status: null,
};
const DeleteCategory = ({ category }: { category: Category }) => {
  const [state, action, pending] = useActionState(
    deleteCategory.bind(null, category.id),
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
          <Trash className="text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={"text-right!"}> حذف الفئة</DialogTitle>
        </DialogHeader>
        <form action={action} className="pt-4">
          <div className="">هل انت متاكد من حذف هذه الفئة <span className="text-primary">{category.name}</span> مع كامل محتوياتها من الدورات والمقالات</div>
          <DialogFooter className="mt-10">
            <Button type="submit" className="bg-destructive hover:bg-destructive/80 cursor-pointer" disabled={pending}>
              {pending ? <Loader /> : "حذف"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
