import { api } from "@/app/_utils/axiosInstance";
import { OrderRepo } from "./order";
import { Order } from "../entities/order";
import { updateOrderData } from "../dto/update-order";

const BASE_URL = "/orders";

export const orderRepo: OrderRepo = {
  getOrders: async (): Promise<Order[]> => {
    const res = await api.get<Order[]>(`${BASE_URL}`);
    return res.data;
  },
  getOrderById: async (orderId: number): Promise<Order> => {
    const res = await api.get<Order>(`${BASE_URL}/${orderId}`);
    return res.data;
  },
  getUserOrders: async (): Promise<Order[]> => {
    const res = await api.get<Order[]>(`${BASE_URL}/user-orders`);
    return res.data;
  },
  getOrderCart: async function (): Promise<Order> {
    const res = await api.get<Order>(`${BASE_URL}/cart`);
    return res.data;
  },
  getCartItemsCount: async (): Promise<number> => {
    const res = await api.get<number>(`${BASE_URL}/cart/count`);
    return res.data;
  },
  updateOrder: async (orderId: number, data: updateOrderData): Promise<Order> => {
    const res = await api.put<Order>(`${BASE_URL}/${orderId}`, data);
    return res.data;
  },
};
