"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react"; // or ShoppingCart depending on your preference
import { useOrderCartItemsCount } from "../hooks/useCartItemsCount";

const CartIcon = () => {
  const { data: cartItemsCount = 0 } = useOrderCartItemsCount();
  const count = Number(cartItemsCount) || 0;

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center p-2 text-zinc-700 hover:text-[#3d593f] transition-colors rounded-full hover:bg-zinc-100/60 group"
      aria-label="Shopping Cart"
    >
      {/* Shopping Cart Icon */}
      <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />

      {/* Counter Badge */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 bg-[#3d593f] text-white text-[10px] font-semibold flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-in zoom-in-50 duration-200">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
