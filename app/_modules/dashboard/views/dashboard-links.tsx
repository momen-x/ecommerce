"use client";
import {
  Menu,
  ChevronLeft,
  BookOpenCheck,
  CreditCard,
  LayoutDashboardIcon,
  MessageSquarePlus,
  User,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import NavButton from "@/components/sharing/nav-btn";
import { ChildrenProps } from "@/app/_types/type";
import Image from "next/image";
import logo from "@/public/assets/logo.png";

const dashboardNaves = [
  { icon: LayoutDashboardIcon, label: "Dashboard", path: "/" },
  {
    icon: User,
    label: "Users",
    path: "/users",
  },
  {
    icon: MessageSquarePlus,
    label: "Categories",
    path: "/categories",
  },
  { icon: BookOpenCheck, label: "Products", path: "/products" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
];

const AdminDashboard = ({ children }: ChildrenProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      <div
        className={`
          border-r
          transition-all duration-300 ease-in-out
          flex flex-col
          ${isSidebarOpen ? "w-64" : "w-20"}
        `}
      >
        <div className="p-4 border-b flex items-center justify-between cursor-pointer">
          {isSidebarOpen && (
            <Link href={"/"}>
              <div className="flex items-center">
                <Image
                  src={logo}
                  alt="NovaCart logo"
                  width={150}
                  height={50}
                  priority
                  className="h-auto w-35 object-contain sm:w-38.75   "
                />
              </div>
            </Link>
          )}
          {!isSidebarOpen && (
            <div className="flex justify-center w-full">
              <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center">
                <LayoutDashboardIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 space-y-2 bg-muted/20 p-3 dark:bg-muted/10">
          {dashboardNaves.map((page) => (
            <NavButton
              key={page.path}
              icon={page.icon}
              label={page.label}
              path={`/dashboard/${page.path}`}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </nav>

        <div className="p-4 border-t space-y-4">
          <div
            className={`flex ${
              isSidebarOpen ? "justify-between" : "justify-center"
            }`}
          ></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {pathname.substring(1).trim()
                ? pathname.substring(1)
                : "Dashboard"}
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6"> {children}</main>
      </div>
    </div>
  );
};

export { AdminDashboard };
