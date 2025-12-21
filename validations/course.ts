import z from "zod";

export const addCourseSchema = z.object({
    title: z.string("هذا الحقل مطلوب").trim(),
    description: z.string("هذا الحقل مطلوب").trim(),
    categoryId: z.string("هذا الحقل مطلوب").trim(),
    basePrice: z.string("هذا القل مطلوب").trim(),
})