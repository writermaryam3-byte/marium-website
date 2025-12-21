"use client"

import { ColumnDef } from "@tanstack/react-table"
import Actions from "./Actions"
import { Course } from "@/lib/generated/prisma/client"
import { getCategoryById } from "@/server/db/category"
import Link from "@/components/link"
import { Pages, Routes } from "@/app/types/enums"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type CourseTable = Course&{
  category: {
    name: string
  }
}
export const columns: ColumnDef<CourseTable>[] = [
  {
    accessorKey: "title",
    header: "عنوان الدورة",
    cell: ({cell, row})=>{
      return <Link className="text-rose-400" href={`${Routes.ADMIN}/${Pages.COURSES}/${Pages.EDIT}/${row.original.id}`}>
        {row.original.title}
      </Link>
    }
  },
  {
    cell: ({row})=>row.original.category?.name??"-",
    header: "الفئة",
  },
  {
    accessorKey: "basePrice",
    header: "السعر الاساسي"
  },
  {
    id: "actions",
    header: "تحكم",
    cell: ({ row }) => {
      
      return <Actions key={row.original.id} row={row}/>
    },
  },
]




