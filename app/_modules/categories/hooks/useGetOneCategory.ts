import { useQuery } from "@tanstack/react-query";
import { categoryQueryKeys } from "./category-query-keys";
import { categoryRepo } from "../repo/resCategory";

export const useGetOneCategory = (categoryId: number) => {
  return useQuery({
    queryKey: categoryQueryKeys.one(categoryId),
    queryFn: () => categoryRepo.getCategoryById(categoryId),
    enabled: !!categoryId,
  });
};
