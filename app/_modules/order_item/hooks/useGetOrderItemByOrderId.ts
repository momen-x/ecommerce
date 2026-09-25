import { useQuery } from "@tanstack/react-query";
import { orderItemQueryKeys } from "./order_item-query-keys";
import { orderItemRepo } from "../repo/resOrderItem";

export const useGetOrderItemByOrderId = (orderId: number) => {
  return useQuery({
    queryKey: orderItemQueryKeys.byOrderId(orderId),
    queryFn: () => orderItemRepo.getOrderItemByOrderId(orderId),
    enabled: !!orderId,
  });
};
