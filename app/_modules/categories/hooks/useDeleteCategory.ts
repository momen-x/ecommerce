import { useQueryClient, useMutation } from "@tanstack/react-query";

import { categoryRepo } from "../repo/resCategory";
import { categoryQueryKeys } from "./category-query-keys";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId: number) => categoryRepo.deleteCategory(categoryId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.all,
      });
    },
  });
};
