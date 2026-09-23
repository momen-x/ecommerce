import { z } from "zod";
import { createProductDto } from "./create-product";

export const updateProductSchema = createProductDto
  .partial()
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be updated",
  });
export type UpdateProductData = z.infer<typeof updateProductSchema>;
