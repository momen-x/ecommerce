import CartPayment from "@/app/_modules/order/views/cart-payment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stripe Payment Page",
  description: "payment for your items",
  keywords: ["pay", "payment", "e-commerce"],
};
const PaymentPage = () => {
  return (
    <div>
      <CartPayment />
    </div>
  );
};

export default PaymentPage;
