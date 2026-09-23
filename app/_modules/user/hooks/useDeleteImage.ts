import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRepo } from "../repo/resUser";
import { userQueryKeys } from "@/app/_modules/user/hooks/user-query-keys";

export const useDeleteImage = ({}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userRepo.deleteUserPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.me() });
    },
  });
};
