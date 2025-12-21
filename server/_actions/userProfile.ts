"use server";

import { Pages, Routes } from "@/app/types/enums";
import { UserRole } from "@/lib/generated/prisma/enums";
import { db } from "@/lib/prisma";
import { updateProfileSchema } from "@/validations/profile";
import { revalidatePath } from "next/cache";
import * as z from "zod";
export const updateUserProfile = async (
  isAdmin: boolean,
  prvState: unknown,
  formData: FormData
) => {
  const validationRes = updateProfileSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validationRes.success)
    return {
      formData,
      error: z.flattenError(validationRes.error).fieldErrors,
    };
  try {
    const user = await db.user.findUnique({
      where: {
        email: validationRes.data.email,
      },
    });
    if(!user)return{
        status: 401,
        message: "هذا المستخدم غير مصرح به",
        formData
    }
    await db.user.update({
        where: {
            email: validationRes.data.email
        },
        data: {
            ...validationRes.data,
            role: isAdmin? UserRole.ADMIN : UserRole.USER
        }
    })
    revalidatePath(`${Routes.PROFILE}`)
    revalidatePath(`${Routes.ADMIN}`)
    revalidatePath(`${Routes.ADMIN}/${Pages.USERS}`)
    revalidatePath(`${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`)
    return {
        status: 200,
        message: "تم تعديث المستخدم بنجاح",
        
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};
