import { Metadata } from "next";

import UpdateUserProfile from "@/app/_modules/user/views/update-profile";

export const metadata: Metadata = {
  title: "Update Profile",
  description: "Update your profile",
  keywords: [
    "user",
    "user profile",
    "account",
    "user account",
    "update profile",
    "update user profile",
  ],
};
const UpdateProfile = () => {
  return (
    <div>
      <UpdateUserProfile />
    </div>
  );
};

export default UpdateProfile;
