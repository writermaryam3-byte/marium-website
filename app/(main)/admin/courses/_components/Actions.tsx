import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { Course } from "@/lib/generated/prisma/client";
import DeleteCourse from "./DeleteCourse";
import { CourseTable } from "./columns";

const Actions = ({ row }: { row: Row<CourseTable> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-black/60 p-4 w-48 text-right!"
      >
        <DropdownMenuLabel className="mb-5">ادوات</DropdownMenuLabel>
        <DeleteCourse course={row.original} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
