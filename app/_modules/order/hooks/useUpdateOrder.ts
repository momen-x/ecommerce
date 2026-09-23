import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { orderRepo } from "../repo/resOrder";
import { updateOrderData } from "../dto/update-order";
import { Order } from "../entities/order";
import { orderItemQueryKeys } from "../../order_item/hooks/order_item-query-keys";

export const useUpdateOrder = (): UseMutationResult<
  Order,
  Error,
  { id: number; data: updateOrderData }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => orderRepo.updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [orderItemQueryKeys.all],
      });
    },
    onError: (error) => {
      console.error("Update order error:", error);
    },
  });
};
