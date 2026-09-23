import { ChildrenProps } from "@/app/_types/type";
import { Metadata } from "next";
import { AdminDashboard } from "@/app/_modules/dashboard/views/dashboard-links";
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Manage your products, orders, and users from the admin dashboard.",
  keywords: ["admin ", "dashboard", "products", "orders", "users"],
};
const DashboardLayout = ({ children }: ChildrenProps) => {
  return <AdminDashboard>{children}</AdminDashboard>;
};

export default DashboardLayout;
