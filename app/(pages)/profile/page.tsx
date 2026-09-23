import UserProfile from "@/app/_modules/user/views/profile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page",
  keywords: ["Profile", "User", "Information"],
};
const ProfilePage = () => {
  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
