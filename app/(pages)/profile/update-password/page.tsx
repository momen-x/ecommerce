import UpdateUserPassword from "@/app/_modules/user/views/update-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Password",
  description: "Update your password",
  keywords: [
    "user",
    "user password",
    "account",
    "user account",
    "update password",
    "update user password",
  ],
};
const UpdatePassword = () => {
  return (
    <div>
      <UpdateUserPassword />
    </div>
  );
};

export default UpdatePassword;
