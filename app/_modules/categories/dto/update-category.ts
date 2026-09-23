import z from "zod";
import { createCategoryDto } from "./create-category";

export const updateCategoryDto = createCategoryDto
  .partial()
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be updated",
  });
export type updateCategoryData = z.infer<typeof updateCategoryDto>;
