import axios from "axios";
import { env } from "../_config/env";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

