import { useQuery } from "@tanstack/react-query";
import { ORDER_DETAIL_KEY } from "./order-quires-key";
import { orderRepo } from "../repo/resOrder";

export const useOrderCart = () => {
  return useQuery({
    queryKey: [ORDER_DETAIL_KEY],
    queryFn: orderRepo.getOrderCart,
  });
};
