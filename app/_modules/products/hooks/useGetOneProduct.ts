import { useQuery } from "@tanstack/react-query";
import { productRepo } from "../repo/resProducts";
import { productsQueryKeys } from "./products-query-keys";

export const useGetOneProduct = (id: number) => {
  return useQuery({
    queryKey: productsQueryKeys.one(id),
    queryFn: () => productRepo.getProductById(id),
    enabled: !!id,
  });
};
