"use client";

import { ColumnDef } from "@tanstack/react-table";
import Actions from "./Actions";
import { Article } from "@/lib/generated/prisma/client";
import Link from "@/components/link";
import { Pages, Routes } from "@/app/types/enums";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export type ArticleTable = ({
  category: {
      name: string;
  };
} & Article)
export const columns: ColumnDef<ArticleTable>[] = [
  {
    accessorKey: "title",
    header: "عنوان المقالة",
    cell: ({ cell, row }) => {
      return (
        <Link
          className="text-rose-400"
          href={`${Routes.ADMIN}/${Pages.ARTICLES}/${Pages.EDIT}/${row.original.id}`}
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {

    header: "الفئة",
    cell : ({row})=> row.original.category?.name?? "-"
  
  },
  {
    accessorKey: "readingTime",
    header: "وقت القراءة",
  },
  {
    id: "actions",
    header: "تحكم",
    cell: ({ row }) => {
      return <Actions key={row.original.id} row={row} />;
    },
  },
];
