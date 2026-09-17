import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueryKeys } from "./user-query-keys";
import { userRepo } from "../repo/resUser";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userRepo.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userQueryKeys.all, userQueryKeys.me],
      });
    },
  });
};
