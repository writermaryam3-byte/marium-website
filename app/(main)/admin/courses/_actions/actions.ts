"use server";

import { Pages, Routes } from "@/app/types/enums";
import { db } from "@/lib/prisma";
import { addCourseSchema } from "@/validations/course";
import { revalidatePath } from "next/cache";
import z from "zod";

export const addCourse = async (prvState: unknown, formData: FormData) => {
  const validationRes = addCourseSchema.safeParse(
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
    const course = await db.course.create({
      data: {
        description: validationRes.data.description,
        basePrice: Number(validationRes.data.basePrice),
        title: validationRes.data.title,
        slug: validationRes.data.title.split(" ").join("-"),
        image: "",
        categoryId: validationRes.data.categoryId,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.COURSES}`);
    revalidatePath(`${Routes.ROOT}`);
    revalidatePath(`${Routes.COURSES}`);
    return {
      status: 201,
      message: "تم اضافة الدورة بنجاح",
      course,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};
export const updateCourse = async (
  courseId: string,
  prvState: unknown,
  formData: FormData
) => {
  const validationRes = addCourseSchema.safeParse(
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
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course)
      return {
        status: 400,
        message: "لا توجد دورة بهذه البيانات",
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
    const updatedCourse = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        description: validationRes.data.description,
        basePrice: Number(validationRes.data.basePrice),
        title: validationRes.data.title,
        slug: validationRes.data.title.split(" ").join("-"),
        image: "",
        categoryId: validationRes.data.categoryId,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.COURSES}`);
    revalidatePath(
      `${Routes.ADMIN}/${Pages.COURSES}/${Pages.EDIT}/${course.id}`
    );
    revalidatePath(`${Routes.ROOT}`);
    revalidatePath(`${Routes.COURSES}`);
    return {
      status: 200,
      message: "تم تحديث الدورة بنجاح",
      updatedCourse,
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
  courseId: string,
  prvState: unknown,
  formData: FormData
) => {
  try {
    await db.course.delete({
      where: {
        id: courseId,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.COURSES}`);
    revalidatePath(
      `${Routes.ADMIN}/${Pages.COURSES}/${Pages.EDIT}/${courseId}`
    );
    revalidatePath(`${Routes.ROOT}`);
    revalidatePath(`${Routes.COURSES}`);

    return {
      message: "تم حذف الدورة بنجاح",
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
