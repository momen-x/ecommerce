import UserOrders from "@/app/_modules/order/views/user-orders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order page",
  description: "user orders page",
  keywords: ["e-commerce", "e-com", "ecommerce", "order", "user orders"],
};
const OrdersPage = () => {
  return (
    <div>
      <UserOrders />
    </div>
  );
};

export default OrdersPage;
