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
import { DeleteIcon, Trash } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../_actions/actions";
import { UserRole } from "@/app/types/enums";
import { User } from "@/lib/generated/prisma/client";
type InitialStateType = {
  message?: string;
  status?: number | null;
};
const initialState: InitialStateType = {
  message: "",
  status: null,
};
const DeleteUser = ({ user }: { user: User }) => {
  const [state, action, pending] = useActionState(
    deleteUser.bind(null, user.id),
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
        <Button variant="outline" className="w-full flex justify-between cursor-pointer">
          <Trash className="text-destructive" />
          <span>حذف</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={"text-right!"}> حذف مستخدم</DialogTitle>
        </DialogHeader>
        <form action={action} className="pt-4">
          <div className="">
            هل انت متاكد من حذف هذا المستخدم{" "}
            <span className="text-primary">{user.username}</span> مع كونة{" "}
            {user.role === UserRole.ADMIN ? "مسؤول" : "مستخدم"}
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

export default DeleteUser;
