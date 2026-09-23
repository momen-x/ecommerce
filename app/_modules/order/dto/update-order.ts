import z from "zod";
import { createOrderItemDto } from "../../order_item/dto/order_item";

export const updateOrderDto = z
  .object({
    phone: z.string().trim().min(4).optional(),
    address: z.string().trim().min(4).optional(),
    customerEmail: z.string().trim().min(4).optional(),
    // orderItems: z.array(createOrderItemDto).default([]),
  })
  .refine(
    (data) =>
      data.phone !== undefined ||
      data.address !== undefined ||
      data.customerEmail !== undefined,
    {
      message: "At least one field must be updated",
    },
  );
export type updateOrderData = z.infer<typeof updateOrderDto>;
