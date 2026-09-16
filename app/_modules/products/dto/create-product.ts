import z from "zod";

export const createProductInput = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be at most 50 characters long"),
  price: z.coerce.number().min(0.0, "Price must be at least $0.00"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
  categoryId: z.coerce.number(),
  imagesUrl: z.instanceof(File),
});

export type CreateProductData = z.infer<typeof createProductInput>;