import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderRepo } from "../repo/resOrder";
import { ORDER_CART_COUNT_KEY, ORDER_LIST_KEY } from "./order-quires-key";

export const useCompleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: orderRepo.updateOrderToCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ORDER_LIST_KEY, ORDER_CART_COUNT_KEY],
      });
    },
  });
};
