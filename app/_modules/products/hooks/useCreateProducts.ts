import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productRepo } from "../repo/resproducts";
import { productsQueryKeys } from "./products-query-keys";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productRepo.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsQueryKeys.all });
    },
  });
};
