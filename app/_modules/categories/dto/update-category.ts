import z from "zod";
import { createCategoryInput } from "./create-category";

export const updateCategorySchema = createCategoryInput
  .partial()
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be updated",
  });
export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
