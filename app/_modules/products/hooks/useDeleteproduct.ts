import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsQueryKeys } from "./products-query-keys";
import { productRepo } from "../repo/resproducts";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productRepo.deleteProduct(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productsQueryKeys.all });
      //   queryClient.setQueryData(productsQueryKeys.one(data.id), data);
    },
  });
};
