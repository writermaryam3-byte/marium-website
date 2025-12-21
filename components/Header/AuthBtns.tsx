"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "../link";
import { Pages, Routes } from "@/app/types/enums";
import { useClientSession } from "@/hooks/useCleintSession";
import { Session } from "next-auth";
const AuthBtns = ({ initialSession }: { initialSession: Session | null }) => {
  const session = useClientSession(initialSession);
  return (
    <>
      {session.data?.user ? (
        <>
          <Button
            className="rounded-full cursor-pointer"
            onClick={() => signOut()}
          >
            تسجيل الخروج
          </Button>
         
        </>
      ) : (
        <div className="flex gap-4 justify-center items-center">
          <Link href={`${Routes.AUTH}/${Pages.LOGIN}`}>
            <Button className=" bg-button cursor-pointer rounded-full">
              تسجيل الدخول
            </Button>
          </Link>
          <Link href={`${Routes.AUTH}/${Pages.Register}`}>
            <Button className=" cursor-pointer rounded-full">انشاء حساب</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthBtns;
