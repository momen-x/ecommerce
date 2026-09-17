import z from "zod";

export const createOrderItemDto = z.object({
  orderId: z.coerce.number().int().positive(),
  productId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().min(1),
});

export type createOrderItemData = z.infer<typeof createOrderItemDto>;
