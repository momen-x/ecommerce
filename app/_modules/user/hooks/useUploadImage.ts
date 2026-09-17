import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import { User } from "../entities/user";
import {
  uploadUserImageData,
} from "../dto/upload-user-image";
import { userRepo } from "../repo/resUser";
import { userQueryKeys } from "./user-query-keys";

export const useUplodImage = (): UseMutationResult<
  User,
  Error,
  uploadUserImageData
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userRepo.uploadUserPhoto,

    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(userQueryKeys.me(), updatedUser);

      await queryClient.invalidateQueries({
        queryKey: userQueryKeys.me(),
      });
    },
  });
};
