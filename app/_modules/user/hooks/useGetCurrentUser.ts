import { useQuery } from "@tanstack/react-query";
import { userQueryKeys } from "./user-query-keys";
import { userRepo } from "../repo/resUser";
import axios from "axios";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: userQueryKeys.me(),
    queryFn: async () => {
      try {
        return await userRepo.getMe();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          return null;
        }

        throw error;
      }
    },
  });
};
