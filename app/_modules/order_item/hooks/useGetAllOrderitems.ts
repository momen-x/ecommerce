import { useQuery } from "@tanstack/react-query";
import { orderItemQueryKeys } from "./order_item-query-keys";
import { orderItemRepo } from "../repo/resOrderItem";

export const useGetAllOrderItems = () => {
  return useQuery({
    queryKey: orderItemQueryKeys.all,
    queryFn: () => orderItemRepo.getAllOrderItems(),
  });
};
