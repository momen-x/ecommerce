import { useQuery } from "@tanstack/react-query";
import { productsQueryKeys } from "./products-query-keys";
import { productRepo } from "../repo/resproducts";

export const useGetProductsWithFilteringAndPagination = (
  page?: number,
  limit?: number,
  categoryId?: number,
) => {
  return useQuery({
    queryKey: productsQueryKeys.filtered(page, limit, categoryId),
    queryFn: () =>
      productRepo.getProductsWithFilteringAndPagination(
        page,
        limit,
        categoryId,
      ),
  });
};
