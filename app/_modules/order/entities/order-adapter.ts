import { OrderStatus } from "./order";

export interface OrderAdapter {
  id: number;
  userId: number;
  totalPrice: number;
  phone: string;
  address: string;
  email: string;
  status: OrderStatus;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  userFirstName: string;
  userLastName: string;
  userImageUrl: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  quantity: number;
  price: number;
  productId: number;
  productImage: string;
  productTitle: string;
  productDescription: string;
}
