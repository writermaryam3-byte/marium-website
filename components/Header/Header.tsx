"use client";
import { FaBars, FaX } from "react-icons/fa6";
import NavBar from "./NavBar";
import Container from "../layouts/Container";
import AuthBtns from "./AuthBtns";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "../link";
import { Routes } from "@/app/types/enums";
import { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { Button } from "../ui/button";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
const Header = ({ initialSession }: { initialSession: Session | null }) => {
  const [navDisplay, setNavDisplay] = useState("hidden");
  const closeNav = () => setNavDisplay("hidden");
  const cart = useAppSelector(selectCartItems);

  return (
    <header className="py-5">
      <Container className="flex justify-between items-center">
        <Link href={Routes.ROOT} className="w-10 h-10 relative cursor-pointer">
          <Image
            className="object-contain"
            fill
            loading="eager"
            priority
            src="/logo.svg"
            alt="logo"
          />
        </Link>
        <div
          className={`${navDisplay} w-full h-screen z-100 fixed inset-0 bg-black flex flex-col gap-5 justify-center px-10 md:px-0 md:static md:h-auto md:flex md:flex-row md:justify-between md:bg-transparent md:items-center`}
        >
          <FaX
            size={30}
            onClick={() => setNavDisplay("hidden")}
            className="absolute top-10 left-10 cursor-pointer md:hidden"
          />
          <NavBar
            closeNav={closeNav}
            classNames="md:flex md:flex-1 md:max-w-150 md:m-auto md:justify-between md:items-center md:gap-3"
            initialSession={initialSession}
          />
          <AuthBtns initialSession={initialSession} />
        </div>
        <div className="flex items-center mr-3 gap-3">
          {initialSession?.user&&(
             <Link href={Routes.PROFILE}>
             <Image
               src={"/user.png"}
               alt="user-img"
               width={40}
               height={40}
               loading="eager"
               priority
             />
           </Link>
          )}
          <Link href={`${Routes.CART}`}>
            <Button variant={"ghost"} className="cursor-pointer relative">
              <BsCart2 />
              {cart.length>0 && (
                <span className="w-5 h-5 top-0 right-0 rounded-full flex justify-center items-center absolute bg-primary text-primary-foreground">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>
          <FaBars
            size={30}
            onClick={() => setNavDisplay("flex")}
            className={`text-gray-200 cursor-pointer md:hidden`}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
