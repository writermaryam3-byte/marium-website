"use client";
import { usePathname } from "next/navigation";
import Button from "../ui/SiteButton";
import { Routes, UserRole } from "@/app/types/enums";
import { Session } from "next-auth";
import { useClientSession } from "@/hooks/useCleintSession";
import Link from "../link";

const NavLink = ({ lable, link, closeNav }: { lable: string; link: string, closeNav: any }) => {
  const pathname = usePathname();
  const isActiveLink = (href: string) => {
    const hrefArray = href.split("/").slice(1);
    return hrefArray.length > 1
      ? pathname.startsWith(`${href}`)
      : pathname.split("/").slice(1)[0] === hrefArray[0];
  };
  const whenActive = isActiveLink(link) ? "after:w-full text-white" : "";
  return (
    <Link
      href={link}
      onClick={closeNav}
      className={`text-gray-300 py-4 px-1 relative rounded-none after:content-[''] after:absolute after:bottom-0 after:duration-300 after:right-0 after:w-0 hover:after:w-full after:h-1 after:bg-pink-500 ${whenActive} block text-center w-full`}
    >
      {lable}
    </Link>
  );
};
const NavBar = ({
  initialSession,
  classNames = "",
  closeNav,
}: {
  initialSession: Session | null;
  classNames: string;
  closeNav: any
}) => {
  const session = useClientSession(initialSession);

  const isAdmin = session.data?.user.role === UserRole.ADMIN;
  const navLinks: { link: string; lable: string }[] = [
    {
      lable: "الرئيسية",
      link: Routes.ROOT,
    },
    {
      lable: "الدورات",
      link: Routes.COURSES,
    },
    {
      lable: "المقالات",
      link: Routes.ARTICLES,
    },
    {
      lable: "تواصل معنا",
      link: Routes.CONTACT,
    },
  ];
  return (
    <nav className={classNames}>
      {navLinks.map(({ lable, link }) => {
        return <NavLink key={lable} lable={lable} link={link}  closeNav={closeNav}/>;
      })}
      {isAdmin && <NavLink lable={"لوحة التحكم"} link={Routes.ADMIN} closeNav={closeNav} />}
    </nav>
  );
};

export default NavBar;
