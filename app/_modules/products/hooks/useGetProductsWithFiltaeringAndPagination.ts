import { useQuery } from "@tanstack/react-query";
import { productsQueryKeys } from "./products-query-keys";
import { productRepo } from "../repo/resproducts";

export const useGetProductsWithFiltaeringAndPagination = (
  page?: number,
  limit?: number,
  catagoryid?: number,
) => {
  return useQuery({
    queryKey: productsQueryKeys.filtered(page, limit, catagoryid),
    queryFn: () =>
      productRepo.getProductsWithFiltaeringAndPagination(
        page,
        limit,
        catagoryid,
      ),
  });
};
