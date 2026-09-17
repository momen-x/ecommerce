import { createOrderItemData } from "../dto/order_item";
import { OrderItem } from "../entities/order_items";

export interface OrderItemRepo {
  createOrderItem(data: createOrderItemData): Promise<OrderItem>;
}
export interface OrderItemRepo {
  createOrderItem(data: createOrderItemData): Promise<OrderItem>;
  getAllOrderItems(): Promise<OrderItem[]>;
  getOrderItemById(orderItemId: number): Promise<OrderItem>;
  getOrderItemByOrderId(orderId: number): Promise<OrderItem[]>; 
  deleteOrderItem(orderItemId: number): Promise<{ message: string }>;
}
