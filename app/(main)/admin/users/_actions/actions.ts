"use server";

import { Pages, Routes } from "@/app/types/enums";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteUser = async (userId: string, prvState: unknown, formData: FormData) => {
  try {
    await db.user.delete({
      where: {
        id: userId,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.USERS}`);
    return {
      message: "تم حذف المستخدم بنجاح",
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
