"use server";

import { Pages, Routes } from "@/app/types/enums";
import { db } from "@/lib/prisma";
import {
  addCategorySchema,
  updateCategorySchema,
} from "@/validations/category";
import { revalidatePath } from "next/cache";
import z from "zod";

export const addCategory = async (prvState: unknown, formData: FormData) => {
  const validationRes = addCategorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validationRes.success)
    return {
      status: 400,
      error: z.flattenError(validationRes.error).fieldErrors,
    };
  try {
    const cat = await db.category.create({
      data: {
        name: validationRes.data.name,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`${Routes.ARTICLES}`);
    revalidatePath(`${Routes.COURSES}`);
    return {
      message: "تم اضافة الفئة بنجاح",
      status: 201,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};

export const updateCategory = async (
  catId: string,
  prvState: unknown,
  formData: FormData
) => {
 
  const validationRes = updateCategorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validationRes.success)
    return {
      status: 400,
      error: z.flattenError(validationRes.error).fieldErrors,
    };
  try {
    const cat = await db.category.findUnique({
      where: {
        id: catId,
      },
    });
    if (!cat)
      return {
        status: 400,
        message: "هذه الفئة غير موجودة",
      };
    await db.category.update({
      where: {
        id: catId,
      },
      data: {
        name: validationRes.data.categoryName,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`${Routes.ARTICLES}`);
    revalidatePath(`${Routes.COURSES}`);
    return {
      message: "تم تحديث الفئة بنجاح",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};

export const deleteCategory = async (
  catId: string,
  prvState: unknown,
  formData: FormData
) => {
  try {
    const cat = await db.category.findUnique({
      where: {
        id: catId,
      },
    });
    if (!cat)
      return {
        status: 400,
        message: "هذه الفئة غير موجودة",
      };
      await db.course.deleteMany({
        where: {
            categoryId: catId
        }
      })
      await db.article.deleteMany({
        where: {
            categoryId: catId
        }
      })
    await db.category.delete({
      where: {
        id: catId,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`${Routes.ARTICLES}`);
    revalidatePath(`${Routes.COURSES}`);
    revalidatePath(`${Routes.ROOT}`);
    return {
      message: "تم حذف الفئة بنجاح",
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};
