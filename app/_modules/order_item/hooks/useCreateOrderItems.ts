import {
  useQueryClient,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

import { orderItemQueryKeys } from "./order_item-query-keys";
import { orderItemRepo } from "../repo/resOrderItem";
import { OrderItem } from "../entities/order_items";
import { createOrderItemData } from "../dto/order_item";
import { ORDER_CART_COUNT_KEY } from "../../order/hooks/order-quires-key";

export const useCreateOrderItem = (): UseMutationResult<
  OrderItem,
  Error,
  createOrderItemData
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: createOrderItemData) =>
      orderItemRepo.createOrderItem(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: orderItemQueryKeys.byOrderId(data.orderId),
      });

      queryClient.invalidateQueries({
        queryKey: orderItemQueryKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: [ORDER_CART_COUNT_KEY],
      });
    },

    onError: (error) => {
      console.error("Create order item error:", error);
    },
  });
};
