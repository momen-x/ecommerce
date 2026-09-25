import { api } from "@/app/_utils/axiosInstance";
import { OrderRepo } from "./order";
import { Order, OrderWithProduct } from "../entities/order";
import { updateOrderData } from "../dto/update-order";
import { orderAdapter } from "../adapters/toOrder";
import { OrderAdapter } from "../entities/order-adapter";

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
  getUserOrders: async (): Promise<OrderAdapter[]> => {
    const res = await api.get<OrderWithProduct[]>(`${BASE_URL}/user-orders`);
    return res.data.map((item) => orderAdapter(item));
  },
  getOrderCart: async function (): Promise<OrderAdapter> {
    const res = await api.get<OrderWithProduct>(`${BASE_URL}/cart`);
    return orderAdapter(res.data);
  },
  getCartItemsCount: async (): Promise<number> => {
    const res = await api.get<number>(`${BASE_URL}/cart/count`);
    return res.data;
  },
  updateOrder: async (
    orderId: number,
    data: updateOrderData,
  ): Promise<Order> => {
    const res = await api.put<Order>(`${BASE_URL}/${orderId}`, data);
    return res.data;
  },
  updateOrderToCompleted: async function (): Promise<{
    message: string;
    order: Order;
  }> {
    const res = await api.post<{ message: string; order: Order }>(
      `${BASE_URL}`,
    );
    return res.data;
  },
};
