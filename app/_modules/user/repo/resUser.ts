import { api } from "@/app/_utils/axiosInstance";
import { UserRepo } from "./user";
import { ChangePasswordData } from "../dto/change-password";
import { updateUserData } from "../dto/update-user-data";
import { User } from "../entities/user";
import { uploadUserImageData } from "../dto/upload-user-image";

const BASE_URL = "/users";
export const userRepo: UserRepo = {
  getMe: async function (): Promise<User> {
    const res = await api.get<User>(`${BASE_URL}/me`);
    return res.data;
  },
  getAllUser: async function (): Promise<User[]> {
    const res = await api.get<User[]>(`${BASE_URL}`);
    return res.data;
  },
  updateMe: async function (data: updateUserData): Promise<User> {
    const res = await api.put<User>(`${BASE_URL}`, data);
    return res.data;
  },
  changePassword: async function (data: ChangePasswordData): Promise<User> {
    const res = await api.put<User>(
      `${BASE_URL}/password/change-password`,
      data,
    );
    return res.data;
  },
  deleteUser: async function (id: number): Promise<User> {
    const res = await api.delete<User>(`${BASE_URL}/${id}`);
    return res.data;
  },
  getUserById: async function (id: number): Promise<User> {
    const res = await api.get<User>(`${BASE_URL}/${id}`);
    return res.data;
  },
  uploadUserPhoto: async function (file: uploadUserImageData): Promise<User> {
    const formData = new FormData();
    formData.append("image", file.image);
    const res = await api.post<User>(`${BASE_URL}/photo-upload`, formData);
    return res.data;
  },
  deleteUserPhoto: async function (): Promise<User> {
    const res = await api.delete<User>(`${BASE_URL}/photo-delete`);
    return res.data;
  },
};
