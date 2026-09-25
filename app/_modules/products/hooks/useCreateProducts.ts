import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsQueryKeys } from "./products-query-keys";
import { productRepo } from "../repo/resProducts";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productRepo.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsQueryKeys.all });
    },
  });
};
