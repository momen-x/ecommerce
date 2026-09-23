import { api } from "@/app/_utils/axiosInstance";
import { OrderItemRepo } from "./order_item";
import { createOrderItemData } from "../dto/order_item";
import { OrderItem } from "../entities/order_items";

const BASE_URL = "/order-items";

export const orderItemRepo: OrderItemRepo = {
  createOrderItem: async function (
    data: createOrderItemData,
  ): Promise<OrderItem> {
    const res = await api.post(`${BASE_URL}`, data);
    return res.data;
  },
  getOrderItemById: async function (orderItemId: number): Promise<OrderItem> {
    const res = await api.get(`${BASE_URL}/${orderItemId}`);
    return res.data;
  },
  deleteOrderItem: async function (
    orderItemId: number,
  ): Promise<{ message: string }> {
    const res = await api.delete(`${BASE_URL}/${orderItemId}`);
    return res.data;
  },
  getOrderItemByOrderId: async function (
    orderId: number,
  ): Promise<OrderItem[]> {
    const res = await api.get(`${BASE_URL}/orders/${orderId}`);
    return res.data;
  },
  getAllOrderItems: async function (): Promise<OrderItem[]> {
    const res = await api.get(`${BASE_URL}`);
    return res.data;
  },
};
