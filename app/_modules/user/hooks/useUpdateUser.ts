import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { userQueryKeys } from "./user-query-keys";
import { userRepo } from "@/app/_modules/user/repo/resUser";
import { User } from "../entities/user";
import { updateUserData } from "../dto/update-user-data";

export const useUpdateUser = (): UseMutationResult<
  User,
  Error,
  updateUserData
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userRepo.updateMe,

    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(userQueryKeys.me(), updatedUser);
      queryClient.invalidateQueries({ queryKey: [userQueryKeys.all] });
    },
  });
};
