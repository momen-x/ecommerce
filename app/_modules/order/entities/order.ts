import { OrderItem } from "../../order_item/entities/order_items";
import { User } from "../../user/entities/user";

export interface Order {
  id: number;
  userId: number;
  orderItems: OrderItem[];
  totalPrice: number;
  phone: string;
  address: string;
  customerEmail: string;
  status: "pending" | "processing" | "cancelled" | "shipped" | "delivered";
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
  order_item: OrderItem[];
}
