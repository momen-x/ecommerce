import z from "zod";

export const createOrderItemDto = z.object({
  productId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().min(1),
});

export type createOrderItemData = z.infer<typeof createOrderItemDto>;
