import { useQuery } from "@tanstack/react-query";
import { userQueryKeys } from "./user-query-keys";
import { userRepo } from "../repo/resUser";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: userQueryKeys.all,
    queryFn: () => userRepo.getAllUser(),
  });
};
