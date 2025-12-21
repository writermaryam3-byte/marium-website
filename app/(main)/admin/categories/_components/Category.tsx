import { Category as CatType } from "@/lib/generated/prisma/client";
import React from "react";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const Category = ({ category }: { category: CatType }) => {
  return (
    <li className="basis-100/100 md:basis-48/100 lg:basis-23/100 p-5 bg-black/60 flex justify-between rounded-2xl cursor-pointer hover:bg-black/40 duration-150">
      <h3>{category.name}</h3>
      <div className="flex gap-4">
        <EditCategory category={category}/>
        <DeleteCategory category={category}/>
      </div>
    </li>
  );
};

export default Category;
