import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { productRepo } from "../repo/resProducts";
import { productsQueryKeys } from "./products-query-keys";
import { UpdateProductData } from "../dto/update-product";
import { Product } from "../entities/products";

export const useUpdateProduct = (): UseMutationResult<
  Product,
  Error,
  { data: UpdateProductData; id: number }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => productRepo.updateProduct(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: productsQueryKeys.one(data.id),
      });
      queryClient.setQueryData(productsQueryKeys.all, data);
    },
  });
};
