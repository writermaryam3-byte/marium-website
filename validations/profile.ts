import * as z from "zod";

export const updateProfileSchema = z.object({
  username: z
    .string({ error: "الاسم مطلوب" })
    .min(3, "الاسم لازم يكون 3 أحرف على الأقل"),

  email: z.email("ادخل بريد الكتروني صالح"),

  phone: z
    .string({ error: "رقم الهاتف مطلوب" })
    .regex(/^[0-9]+$/, "رقم الهاتف لازم يحتوي أرقام فقط")
    .min(7, "رقم الهاتف غير صالح")
    .max(15, "رقم الهاتف غير صالح"),

  career: z.string({ error: "الوظيفة مطلوبة" }).min(2, "ادخل اسم وظيفة صحيح"),

  streetAddress: z
    .string({ error: "عنوان الشارع مطلوب" })
    .min(5, "عنوان الشارع غير كافي"),

  postalCode: z
    .string({ error: "الكود البريدي مطلوب" })
    .regex(/^[0-9]{3,10}$/, "ادخل كود بريدي صحيح"),

  city: z.string({ error: "المدينة مطلوبة" }).min(2, "ادخل اسم مدينة صحيح"),

  country: z
    .string({ error: "الدولة مطلوبة" })
    .min(2, "ادخل اسم دولة صحيح"),
});
