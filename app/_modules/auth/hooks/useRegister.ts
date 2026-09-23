import { useMutation } from "@tanstack/react-query";
import { authRepo } from "@/app/_modules/auth/repo/resAuth";

export const useRegister = () => {
  return useMutation({
    mutationFn: authRepo.register,
    retry: false,
  });
};
