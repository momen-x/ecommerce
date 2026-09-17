import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { orderItemRepo } from "../repo/resorderItem";
import { orderItemQueryKeys } from "./order_item-query-keys";

export const useDeleteOrderItem = (): UseMutationResult<
  { message: string },
  Error,
  number
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderItemId: number) =>
      orderItemRepo.deleteOrderItem(orderItemId),

    onSuccess: (data, orderItemId) => {
      queryClient.invalidateQueries({
        queryKey: orderItemQueryKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: orderItemQueryKeys.byOrderId(orderItemId),
      });
    },

    onError: (error) => {
      console.error("Delete order item error:", error);
    },
  });
};
