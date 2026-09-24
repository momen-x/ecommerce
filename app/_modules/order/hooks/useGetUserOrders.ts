import { useQuery } from "@tanstack/react-query";
import { ORDER_LIST_KEY } from "./order-quires-key";
import { orderRepo } from "../repo/resOrder";

export const useGetUserOrders = () => {
  return useQuery({
    queryKey: [ORDER_LIST_KEY],
    queryFn: orderRepo.getUserOrders,
  });
};
