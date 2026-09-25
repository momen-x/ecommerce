import type { OrderItemWithProduct, OrderWithProduct } from "../entities/order";
import { OrderAdapter, OrderItem } from "../entities/order-adapter";

export const mapOrderToAdapter = (order: OrderWithProduct): OrderAdapter => {
  return {
    id: order.id,
    address: order.address,
    createdAt: order.createdAt,
    email: order.customerEmail,
    isPaid: order.isPaid,
    phone: order.phone,
    status: order.status,
    orderItems: order.orderItems.map((item) => mapOrderItems(item)),
    totalPrice: Number(order.totalPrice),
    updatedAt: order.updatedAt,
    userFirstName: order.user.firstName,
    userLastName: order.user.lastName,
    userId: order.user.id,
    userImageUrl: order.user.userImageUrl,
  };
};

const mapOrderItems = (item: OrderItemWithProduct): OrderItem => {
  return {
    price: Number(item.price),
    quantity: item.quantity,
    productId: item.product.id,
    productTitle: item.product.title,
    productDescription: item.product.description,
    productImage: item.product.imageUrl,
  };
};
