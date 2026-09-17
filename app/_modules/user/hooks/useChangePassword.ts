import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { userQueryKeys } from "./user-query-keys";

import { userRepo } from "@/app/_modules/user/repo/resUser";
import { ChangePasswordData } from "../dto/change-password";
import { User } from "../entities/user";

export const useChangePassword = (): UseMutationResult<
  User,
  Error,
  ChangePasswordData
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ChangePasswordData) => userRepo.changePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userQueryKeys.me] });
    },
  });
};
