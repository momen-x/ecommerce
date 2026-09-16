import {
  useQueryClient,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

import { categoryRepo } from "../repo/resCategory";
import { categoryQueryKeys } from "./category-query-keys";
import { Category } from "../entities/category";
import { UpdateCategoryData } from "../dto/update-category";

export const useUpdateLesson = (): UseMutationResult<
  Category,
  Error,
  { categoryId: number; data: UpdateCategoryData }
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
