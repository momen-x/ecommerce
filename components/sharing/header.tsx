"use client";
import { useGetCurrentUser } from "@/app/_modules/user/hooks/useGetCurrentUser";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileDropdown } from "./dropdown-user-menu";
import logo from "@/public/assets/logo.png";
import Image from "next/image";
import CartIcon from "@/app/_modules/order/views/cart-icon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/products", label: "products" },
];

const adminDashboardLink = {
  href: "/dashboard",
  label: "Dashboard",
};

const Headers = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user, isLoading } = useGetCurrentUser();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80 shrink-0"
          >
            <div className="flex items-center">
              <Image
                src={logo}
                alt="NovaCart"
                width={100}
                height={50}
                priority
                className="h-40 w-40 object-contain"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}

            {user?.isAdmin && (
              <Link
                href={adminDashboardLink.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {adminDashboardLink.label}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <>
                <ProfileDropdown />
                <CartIcon />
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => router.push("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />

          <div className="fixed left-0 top-16 bottom-0 w-72 bg-background shadow-xl animate-in slide-in-from-left overflow-y-auto">
            <div className="flex flex-col p-6 space-y-6">
              {/* Nav links */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground px-4 py-3 rounded-lg hover:bg-accent"
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                ))}

                {user?.isAdmin && (
                  <Link
                    href={adminDashboardLink.href}
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground px-4 py-3 rounded-lg hover:bg-accent"
                    onClick={closeMenu}
                  >
                    {adminDashboardLink.label}
                  </Link>
                )}
              </nav>

              {/* Auth buttons for unauthenticated users on mobile */}
              {!isLoading && !user && (
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push("/login");
                      closeMenu();
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      router.push("/register");
                      closeMenu();
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Headers;
