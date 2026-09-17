import {
  useQueryClient,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

import { categoryRepo } from "../repo/resCategory";
import { categoryQueryKeys } from "./category-query-keys";
import { Category } from "../entities/category";
import { CreateCategoryData } from "../dto/create-category";

export const useCreateCategory = (): UseMutationResult<
  Category,
  Error,
  { sectionId: string; data: CreateCategoryData }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }) => categoryRepo.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.all,
      });
    },
  });
};
