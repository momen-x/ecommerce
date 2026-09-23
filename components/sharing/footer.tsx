import Link from "next/link";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "../icons/social-icons";

import logo from "@/public/assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Image src={logo} alt="NovaCart" width={120} height={60} />
            </div>

            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              Discover thoughtfully selected products for your everyday life,
              from fashion and home essentials to beauty, tech, and more.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 font-semibold">Shop</h3>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/products" className="hover:text-foreground">
                All Products
              </Link>

              <Link href="/categories" className="hover:text-foreground">
                Categories
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold">Support</h3>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/orders" className="hover:text-foreground">
                Track Your Order
              </Link>

              <Link href="/about" className="hover:text-foreground">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Contact Us
              </Link>

              <Link href="/faq" className="hover:text-foreground">
                FAQ
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-semibold">Stay in the loop</h3>

            <div className="mt-5 flex gap-4 text-muted-foreground">
              <InstagramIcon className="h-5 w-5 cursor-pointer hover:text-foreground" />
              <FacebookIcon className="h-5 w-5 cursor-pointer hover:text-foreground" />
              <YoutubeIcon className="h-5 w-5 cursor-pointer hover:text-foreground" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 NovaCart. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
