import z from "zod";

export const contactSchema = z.object({
    username: z.string("لا يكمن ان يكون الحقل خاليا!").min(2, {
      message: "يحب ان يكون الاسم علي الاقل من حرفين!",
    }),
    email: z.email("الرجاء ادخال بريد الكتروني صالح"),
    message: z.string("لا يمكن ارسال رسالة خالية!").min(5, "يحب ان تحتوي الرسالة علي 5 احرف علي الاقل!")
  })