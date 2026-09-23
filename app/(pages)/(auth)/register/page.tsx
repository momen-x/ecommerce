import { RegisterForm } from "@/app/_modules/auth/views/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to continue account",
  keywords: ["e-commerce", "ecommerce", "products", "sign up", "register"],
};
const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
