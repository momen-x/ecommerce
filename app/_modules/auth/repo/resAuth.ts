import { api } from "@/app/_utils/axiosInstance";
import { AuthRepo } from "./auth";
import { User } from "../../user/entities/user";
import { loginData } from "../dto/login";
import { registerData } from "../dto/register";

const BASE_URL = "/users/auth";

export const authRepo: AuthRepo = {
  login: async function (
    data: loginData,
  ): Promise<{ message: string; user?: User }> {
    const res = await api.post<{ message: string; user?: User }>(
      `${BASE_URL}/login`,
      data,
    );
    return res.data;
  },
  register: async function (
    data: registerData,
  ): Promise<{ message: string; user?: User }> {
    const res = await api.post<{ message: string; user?: User }>(
      `${BASE_URL}/register`,
      data,
    );
    return res.data;
  },
  logout: async function (): Promise<{ message: string }> {
    const res = await api.post<{ message: string }>(`${BASE_URL}/logout`);
    return res.data;
  },
};
