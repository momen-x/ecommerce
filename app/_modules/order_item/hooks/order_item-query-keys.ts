export const orderItemQueryKeys = {
  all: ["order_items"] as const,
  one: (id: number) => [...orderItemQueryKeys.all, "single", id] as const,
  byOrderId: (orderId: number) =>
    [...orderItemQueryKeys.all, "by_order_id", orderId] as const,
};
