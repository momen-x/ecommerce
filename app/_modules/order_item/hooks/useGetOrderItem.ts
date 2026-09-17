import { useQuery } from "@tanstack/react-query";
import { orderItemQueryKeys } from "./order_item-query-keys";
import { orderItemRepo } from "../repo/resorderItem";

export const useGetOrderItem = (orderItemId: number) => {
  return useQuery({
    queryKey: orderItemQueryKeys.one(orderItemId),
    queryFn: () => orderItemRepo.getOrderItemById(orderItemId),
    enabled: !!orderItemId,
  });
};
