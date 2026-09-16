import { useQuery } from "@tanstack/react-query";
import { productRepo } from "../repo/resproducts";
import { productsQueryKeys } from "./products-query-keys";

export const useGetCategory = (id: number) => {
  return useQuery({
    queryKey: productsQueryKeys.one(id),
    queryFn: () => productRepo.getProductById(id),
    enabled: !!id,
  });
};
