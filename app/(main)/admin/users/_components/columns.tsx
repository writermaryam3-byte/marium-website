"use client"

import { UserRole } from "@/app/types/enums"
import { User } from "@/lib/generated/prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import Actions from "./Actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "الاسم",
  },
  {
    accessorKey: "email",
    header: "البريد الالكتروني",
  },
  {
    accessorKey: "phone",
    header: "رقم الهاتف",
  },
  {
    accessorKey: "career",
    header: "الوظيفة"
  },
  {
    accessorKey: "country",
    header: "الدولة"
  },
  {
    accessorKey: "city",
    header: "المدينة"
  },
  {
    accessorKey: "streetAddress",
    header: "عنوان الشارع"
  },
  {
    accessorFn: ({role})=>{
        return role===UserRole.ADMIN?"مسؤول":"مستخدم"
    },
    header: "الحالة"
  },
  {
    id: "actions",
    header: "تحكم",
    cell: ({ row }) => {
      
      return <Actions key={row.original.id} row={row}/>
    },
  },
]




