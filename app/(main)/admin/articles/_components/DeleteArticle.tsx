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
import { Trash } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { Article, Course } from "@/lib/generated/prisma/client";
import { deleteCourse } from "../_actions/actions";
import { ArticleTable } from "./columns";
type InitialStateType = {
  message?: string;
  status?: number | null;
};
const initialState: InitialStateType = {
  message: "",
  status: null,
};
const DeleteArticle = ({ article }: { article: ArticleTable }) => {
  const [state, action, pending] = useActionState(
    deleteCourse.bind(null, article.id),
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
        <Button
          variant="outline"
          className="w-full cursor-pointer flex justify-between items-center"
        >
          <Trash className="text-destructive" />
          <span>حذف</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={"text-right!"}> حذف مقالة</DialogTitle>
        </DialogHeader>
        <form action={action} className="pt-4">
          <div className="">
            هل انت متاكد من حذف هذه المفالة{" "}
            <span className="text-primary">{article.title}</span>
          </div>
          <DialogFooter className="mt-10">
            <Button
              type="submit"
              className="bg-destructive hover:bg-destructive/80 cursor-pointer"
              disabled={pending}
            >
              {pending ? <Loader /> : "حذف"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteArticle;
