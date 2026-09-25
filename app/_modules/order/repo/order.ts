import { updateOrderData } from "../dto/update-order";
import { Order } from "../entities/order";
import { OrderAdapter } from "../entities/order-adapter";

export interface OrderRepo {
  getOrders(): Promise<Order[]>;
  getOrderById(orderId: number): Promise<Order>;
  getUserOrders(): Promise<OrderAdapter[]>;
  getOrderCart(): Promise<OrderAdapter>;
  getCartItemsCount(): Promise<number>;
  updateOrder(orderId: number, data: updateOrderData): Promise<Order>;
  updateOrderToCompleted(): Promise<{ message: string; order: Order }>;
}
