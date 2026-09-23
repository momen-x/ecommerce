import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productRepo } from "../repo/resProducts";
import { productsQueryKeys } from "./products-query-keys";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productRepo.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsQueryKeys.all });
    },
  });
};
