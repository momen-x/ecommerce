import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authRepo } from "../repo/resAuth";
import { userQueryKeys } from "@/app/_modules/user/hooks/user-query-keys";
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authRepo.logout,
    onSuccess: () => {
      queryClient.setQueryData(userQueryKeys.me(), null);

      queryClient.removeQueries({
        predicate: (query) => query.meta?.requiresAuth === true,
      });
    },
  });
};
