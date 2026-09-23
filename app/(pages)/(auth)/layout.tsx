import { ChildrenProps } from "@/app/_types/type";
import GuestGuard from "@/components/guards/GuestGuard";

const AuthLayout = ({ children }: ChildrenProps) => {
  return (
    <>
      <GuestGuard redirectTo="/">{children}</GuestGuard>
    </>
  );
};

export default AuthLayout;
