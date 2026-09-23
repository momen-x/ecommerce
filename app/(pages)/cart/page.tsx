import { Metadata } from "next";

import CartView from "@/app/_modules/order/views/cart-view";

export const metadata: Metadata = {
  title: "Cart Page",
  description: "this is a cart page",
  keywords: ["e-commerce, novaCart", "cart", "order", "orders"],
};
const CartPage = () => {
  return (
    <div>
      <CartView />
    </div>
  );
};

export default CartPage;
