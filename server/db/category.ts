
import { db } from "@/lib/prisma";
import { cache } from "../cache";


export const getCategories = cache(()=>{
    return db.category.findMany();
}, ["available-categories"], {revalidate: 3600})


export const getCategoryById = (id: string)=> cache(
    () => {
      return db.category.findUnique({
          where: { id },
        });
    },
    ["categories-by-id", id],
    { revalidate: 3600 }
  )();
  