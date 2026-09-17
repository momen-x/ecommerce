import { useQuery } from "@tanstack/react-query";
import { userQueryKeys } from "./user-query-keys";
import { userRepo } from "@/app/_modules/user/repo/resUser";

export const useGetUser = (id: number) => {
  return useQuery({
    queryKey: [userQueryKeys.one],
    queryFn: () => userRepo.getUserById(id),
    enabled: !!id,
  });
};
