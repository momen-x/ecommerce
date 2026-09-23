import { useQuery } from "@tanstack/react-query";
import { ORDER_CART_COUNT_KEY } from "./order-quires-key";
import { orderRepo } from "../repo/resOrder";

export const useOrderCartItemsCount = () => {
  return useQuery({
    queryKey: [ORDER_CART_COUNT_KEY],
    queryFn: orderRepo.getCartItemsCount,
  });
};
