"use server";

import { Pages, Routes } from "@/app/types/enums";
import { db } from "@/lib/prisma";
import { articleSchema } from "@/validations/article";
import { revalidatePath } from "next/cache";
import z from "zod";

export const addArticle = async (prvState: unknown, formData: FormData) => {
  const validationRes = articleSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validationRes.success) {
    return {
      status: 400,
      error: z.flattenError(validationRes.error).fieldErrors,
      formData,
    };
  }
  try {
    const cat = await db.category.findUnique({
      where: {
        id: validationRes.data.categoryId,
      },
    });
    if (!cat)
      return {
        status: 400,
        message: "هذه الفئة غير موجودة الرجاء اضافتها",
        formData,
      };
    const article = await db.article.create({
      data: {
        content: validationRes.data.content,
        description: validationRes.data.description,
        readingTime: validationRes.data.readingTime,
        title: validationRes.data.title,
        slug: validationRes.data.title.split(" ").join("-"),
        image: "",
        categoryId: validationRes.data.categoryId,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.ARTICLES}`);
    revalidatePath(`${Routes.ROOT}`);
    revalidatePath(`${Routes.ARTICLES}`);
    return {
      status: 201,
      message: "تم اضافة المقالة بنجاح",
      article,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};
export const updateArticle = async (
  articleId: string,
  prvState: unknown,
  formData: FormData
) => {
  const validationRes = articleSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validationRes.success) {
    return {
      status: 400,
      error: z.flattenError(validationRes.error).fieldErrors,
      formData,
    };
  }
  try {
    const article = await db.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!article)
      return {
        status: 400,
        message: "لا توجد مقالة بهذه البيانات",
      };

    const cat = await db.category.findUnique({
      where: {
        id: validationRes.data.categoryId,
      },
    });
    if (!cat)
      return {
        status: 400,
        message: "هذه الفئة غير موجودة الرجاء اضافتها",
        formData,
      };
    const updatedArticle = await db.article.update({
      where: {
        id: articleId,
      },
      data: {
        content: validationRes.data.content,
        description: validationRes.data.description,
        readingTime: validationRes.data.readingTime,
        title: validationRes.data.title,
        slug: validationRes.data.title.split(" ").join("-"),
        image: "",
        categoryId: validationRes.data.categoryId,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.ARTICLES}`);
    revalidatePath(
      `${Routes.ADMIN}/${Pages.ARTICLES}/${Pages.EDIT}/${article.id}`
    );
    revalidatePath(`${Routes.ROOT}`);
    revalidatePath(`${Routes.ARTICLES}`);
    return {
      status: 200,
      message: "تم تحديث المقالة بنجاح",
      updatedArticle,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};

export const deleteCourse = async (
  articleId: string,
  prvState: unknown,
  formData: FormData
) => {
  try {
    await db.article.delete({
      where: {
        id: articleId,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.ARTICLES}`);
    revalidatePath(
      `${Routes.ADMIN}/${Pages.ARTICLES}/${Pages.EDIT}/${articleId}`
    );
    revalidatePath(`${Routes.ROOT}`);
    revalidatePath(`${Routes.ARTICLES}`);

    return {
      message: "تم حذف المقالة بنجاح",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};
