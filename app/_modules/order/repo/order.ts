import { updateOrderData } from "../dto/update-order";
import { Order } from "../entities/order";

export interface OrderRepo {
  getOrders(): Promise<Order[]>;
  getOrderById(orderId: number): Promise<Order>;
  getUserOrders(): Promise<Order[]>;
  getOrderCart(): Promise<Order>;
  getCartItemsCount(): Promise<number>;
  updateOrder(orderId: number, data: updateOrderData): Promise<Order>;
}
