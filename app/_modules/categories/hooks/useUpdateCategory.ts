import {
  useQueryClient,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

import { categoryRepo } from "../repo/resCategory";
import { categoryQueryKeys } from "./category-query-keys";
import { Category } from "../entities/category";
import { updateCategoryData } from "../dto/update-category";

export const useUpdateCategory = (): UseMutationResult<
  Category,
  Error,
  { categoryId: number; data: updateCategoryData }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, data }) =>
      categoryRepo.updateCategory(categoryId, data),

    onSuccess: (updatedLesson) => {
      queryClient.setQueryData(categoryQueryKeys.all, updatedLesson);

      queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.one(updatedLesson.id),
      });
    },
  });
};
