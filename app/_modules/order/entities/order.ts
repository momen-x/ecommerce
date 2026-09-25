import { OrderItem } from "../../order_item/entities/order_items";
import { User } from "../../user/entities/user";
import { Product } from "../../products/entities/product";

export type OrderStatus =
  | "pending"
  | "processing"
  | "cancelled"
  | "shipped"
  | "delivered";

export interface OrderItemWithProduct extends OrderItem {
  product: Product;
}

export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  phone: string;
  address: string;
  customerEmail: string;
  status: OrderStatus;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
  orderItems: OrderItem[];
}

export interface OrderWithProduct extends Omit<Order, "orderItems"> {
  orderItems: OrderItemWithProduct[];
}
