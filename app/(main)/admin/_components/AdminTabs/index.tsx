"use client";
import { Pages, Routes } from "@/app/types/enums";
import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { useParams, usePathname } from "next/navigation";

function AdminTabs() {
  const pathname = usePathname();

  const tabs = [
    {
      id: crypto.randomUUID(),
      title: "الرئسية",
      href: Routes.ADMIN,
    },
    {
      id: crypto.randomUUID(),
      title: "الفئات",
      href: `${Routes.ADMIN}/${Pages.CATEGORIES}`,
    },
    {
      id: crypto.randomUUID(),
      title: "المقالات",
      href: `${Routes.ADMIN}/${Pages.ARTICLES}`,
    },
    {
      id: crypto.randomUUID(),
      title: "الدورات",
      href: `${Routes.ADMIN}/${Pages.COURSES}`,
    },
    {
      id: crypto.randomUUID(),
      title: "المستخدمين",
      href: `${Routes.ADMIN}/${Pages.USERS}`,
    },
    {
      id: crypto.randomUUID(),
      title: "الظلبات",
      href: `${Routes.ADMIN}/${Pages.ORDERS}`,
    },
  ];
  const isActiveTab = (href: string) => {
    const hrefArray = href.split("/");
    return hrefArray.length > 2
      ? pathname.startsWith(`${href}`)
      : pathname === `${href}`;
  };
  return (
    <nav className="mt-20 mb-5">
      <ul className="flex items-center flex-wrap gap-4 justify-center">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              href={`${tab.href}`}
              className={`hover:text-white! ${
                isActiveTab(tab.href)
                  ? buttonVariants({ variant: "default" })
                  : buttonVariants({ variant: "outline" })
              }`}
            >
              {tab.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AdminTabs;
