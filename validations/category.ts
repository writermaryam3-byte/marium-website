import * as z from "zod";

export const addCategorySchema = z.object({
  name: z.string().trim().min(1, {
    message: "هذا الحقل مطلوب",
  }),
});

export const updateCategorySchema = z.object({
  categoryName: z.string().trim().min(1, {
    message: "هذا الحقل مطلوب",
  }),
});
