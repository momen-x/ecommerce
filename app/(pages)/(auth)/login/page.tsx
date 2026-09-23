import { LoginForm } from "@/app/_modules/auth/views/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
  keywords: ["login", "account", "authentication", "e-commerce"],
};
const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};
export default LoginPage;
