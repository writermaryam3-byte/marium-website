import z from "zod";

export const articleSchema = z.object({
    title: z.string("هذا الحقل مطلوب").trim(),
    description: z.string("هذا الحقل مطلوب").trim(),
    categoryId: z.string("هذا الحقل مطلوب").trim(),
    readingTime: z.string("هذا القل مطلوب").trim(),
    content: z.string("هذا الحقل مطلوب").trim(),
})