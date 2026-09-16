import { useQuery } from "@tanstack/react-query";
import { categoryQueryKeys } from "./category-query-keys";
import { categoryRepo } from "../repo/resCategory";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: categoryQueryKeys.all,
    queryFn: () => categoryRepo.getCategories(),
  });
};
