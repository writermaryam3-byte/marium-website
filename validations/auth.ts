import * as z from "zod";

export const loginSchema = z.object({
  phone: z.string().trim().min(5, "الرجاء ادخال رقم هاتف صالح"),
  password: z
    .string("كلمة المرور لا يجب ان تكون فارغة")
    .min(8, "الرجاء ادخال 8 احرف علي الأقل."),
});

export const signupSchema = z
  .object({
    username: z
      .string({})
      .trim() // إزالة المسافات البيضاء من البداية والنهاية
      .min(3, { message: "يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل" })
      .max(50, { message: "اسم المستخدم طويل جدًا (الحد الأقصى 50 حرفًا)" }),

    email: z.email("الرجاء ادخال بريد الكتروني صالح"),
    phone: z
      .string()
      .trim()
      .min(10, { message: "رقم الهاتف قصير جدًا" })
      .max(50, { message: "رقم الهاتف طويل جدًا" }),
    career: z
      .string()
      .trim()
      .min(2, { message: "يجب أن تكون الوظيفة حرفين على الأقل" })
      .max(100, { message: "الوظيفة طويلة جدًا" }),

    password: z
      .string()
      .min(8, { message: "يجب أن تتكون كلمة المرور من 8 أحرف أو أكثر" }),

    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "كلمات المرور غير متطابقة",
    path: ["password2"], // يربط رسالة الخطأ بحقل 'password2'
  });

export type ValidationErrors = {
  [key: string]: string[] | undefined;
};
