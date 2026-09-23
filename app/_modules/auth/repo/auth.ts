import { User } from "../../user/entities/user";
import { loginData } from "../dto/login";
import { registerData } from "../dto/register";

export interface AuthRepo {
  login: (data: loginData) => Promise<{ message: string; user?: User }>;
  register: (data: registerData) => Promise<{ message: string; user?: User }>;
  logout: () => Promise<{ message: string }>;
}
