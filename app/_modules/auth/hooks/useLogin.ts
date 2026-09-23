import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueryKeys } from "@/app/_modules/user/hooks/user-query-keys";
import { authRepo } from "@/app/_modules/auth/repo/resAuth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authRepo.login,
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: userQueryKeys.me(),
      });
    },
  });
};
