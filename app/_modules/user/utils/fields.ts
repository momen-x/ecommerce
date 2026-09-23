import { Lock, User } from "lucide-react";
import { ChangePasswordData } from "../dto/change-password";
import { updateUserData } from "../dto/update-user-data";
import { FormField } from "@/app/_types/type";

export const updateUserNameFields = [
  {
    name: "firstName",
    title: "Enter your first name",
    placeholder: "your first name",
    Icon: User,
    type: "text",
  },
  {
    name: "lastName",
    title: "Enter your last name",
    placeholder: "your last name",
    Icon: User,
    type: "text",
  },
] satisfies FormField<keyof updateUserData & string>[];
export const updateUserPasswordFields = [
  {
    name: "oldPassword",
    title: "Enter your old password",
    placeholder: "••••••••",
    Icon: Lock,
    type: "password",
  },
  {
    name: "newPassword",
    title: "Enter your new password",
    placeholder: "••••••••",
    Icon: Lock,
    type: "password",
  },
  {
    name: "confirmNewPassword",
    title: "Confirm your new password",
    placeholder: "••••••••",
    Icon: Lock,
    type: "password",
  },
] satisfies FormField<keyof ChangePasswordData & string>[];
