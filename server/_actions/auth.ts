"use server";
import { Pages, Routes } from "@/app/types/enums";
import { db } from "@/lib/prisma";
import { loginSchema, signupSchema } from "@/validations/auth";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import * as z from "zod";
export const login = async (
  credentials: Record<"phone" | "password", string> | undefined
) => {
  let validationRes = loginSchema.safeParse(credentials);
  if (!validationRes.success)
    return {
      status: 400,
      error: z.flattenError(validationRes.error).fieldErrors
    };
  try {
    const user = await db.user.findUnique({
      where: {
        phone: validationRes.data.phone,
      },
    });
    if (!user)
      return {
        status: 401,
        message: "خطا فبيانات الدخول",
      };
    const isValidPassword = bcrypt.compare(
      validationRes.data.password!,
      user.password
    );
    if (!isValidPassword)
      return {
        status: 401,
        message: "خطا فبيانات الدخول",
      };
    const { password, ...uerWithoutPassword } = user;
    return {
      status: 200,
      uerWithoutPassword,
      message: "تم تسجيل الدخول بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "حدث خطأ ما تواصل مع الدعم",
    };
  }
};

export const signup = async (prvState: unknown, data: FormData) => {
  let validationRes = signupSchema.safeParse(
    Object.fromEntries(data.entries())
  );
  if (!validationRes.success)
    return {
      formData: data,
      error: z.flattenError(validationRes.error).fieldErrors
    };
  try {
    const user = await db.user.findUnique({
      where: {
        phone: validationRes.data.phone,
      },
    });
    const userByEmail = await db.user.findUnique({
      where: {
        email: validationRes.data.email,
      },
    });
    if (user || userByEmail)
      return {
        status: 409,
        message: "هذا المستخدم موجود بالفعل",
        formData: data,
      };
    const hashedPassword = await bcrypt.hash(validationRes.data.password, 10);
    const createdUser = await db.user.create({
      data: {
        email: validationRes.data.email,
        username: validationRes.data.username,
        phone: validationRes.data.phone,
        password: hashedPassword,
        career: validationRes.data.career,
      },
    });
    revalidatePath(`${Routes.ADMIN}/${Pages.USERS}`)
    return {
        status: 201,
        message: "تم انشاء الحساب بنجاح",
        user: {
            id: createdUser.id,
            name: createdUser.username,
            email: createdUser.email,
            phone: createdUser.phone
        }
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "حدث خطأ غير معروف الرجاء التواصل مع الدعم",
    };
  }
};
