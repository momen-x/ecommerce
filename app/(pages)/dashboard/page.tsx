import AdminGuard from "@/components/guards/RoleGuard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage your store",
  keywords: ["admin", "dashboard", "e-commerce"],
};

const AdminDashboardPage = () => {
  return <AdminGuard>AdminDashboardPage</AdminGuard>;
};

export default AdminDashboardPage;
