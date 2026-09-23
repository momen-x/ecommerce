import { FormField } from "@/app/_types/type";
import { loginData } from "../dto/login";
import { registerForm } from "../dto/register";
import { Lock, Mail, User } from "lucide-react";

export const registerFields = [
  {
    name: "firstName",
    title: "Enter your first name",
    placeholder: "Enter your first name",
    Icon: User,
    type: "text",
  },
  {
    name: "lastName",
    title: "Enter your last name",
    placeholder: "Enter your last name",
    Icon: User,
    type: "text",
  },
  {
    name: "email",
    title: "Enter user email",
    placeholder: "example@example.com",
    Icon: Mail,
    type: "email",
  },
  {
    name: "password",
    title: "Enter the password",
    placeholder: "••••••••",
    Icon: Lock,
    type: "password",
  },
  {
    name: "confirmPassword",
    title: "Confirm your password",
    placeholder: "••••••••",
    Icon: Lock,
    type: "password",
  },
] satisfies FormField<keyof registerForm & string>[];

export const loginFields = [
  {
    name: "email",
    title: "Enter your email",
    placeholder: "example@example.com",
    Icon: Mail,
    type: "email",
  },
  {
    name: "password",
    title: "Enter your password",
    placeholder: "*********",
    Icon: Lock,
    type: "password",
  },
] satisfies FormField<keyof loginData & string>[];
