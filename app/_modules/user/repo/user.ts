import { ChangePasswordData } from "../dto/change-password";
import { UpdateUserData } from "../dto/update-user-data";
import { uploadUserImageData } from "../dto/upload-user-image";
import { User } from "../entities/user";

export interface UserRepo {
  getMe: () => Promise<User>;
  getAllUser: () => Promise<User[]>;
  updateMe: (data: UpdateUserData) => Promise<User>;
  changePassword: (data: ChangePasswordData) => Promise<User>;
  deleteUser: (id: number) => Promise<User>;
  getUserById: (id: number) => Promise<User>;
  uploadUserPhoto: (file: uploadUserImageData) => Promise<User>;
}
