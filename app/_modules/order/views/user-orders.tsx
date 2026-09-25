"use client";

import { CheckCircle2, Mail, MapPin, Package, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetUserOrders } from "../hooks/useGetUserOrders";
import Image from "next/image";
import LoadingPage from "@/app/loading";

const UserOrders = () => {
  const { data: orders, isLoading } = useGetUserOrders();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20">
        <Card className="rounded-3xl border-zinc-200 p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#3d593f]/10">
            <Package className="h-7 w-7 text-[#3d593f]" />
          </div>

          <h2 className="text-xl font-semibold text-zinc-900">No orders yet</h2>

          <p className="mt-2 text-sm text-zinc-500">
            Your completed orders will appear here.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3d593f]">
            My Orders
          </span>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
            Your order history
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            View your completed purchases and order details.
          </p>
        </div>

        {/* Orders */}
        <div className="space-y-5">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="overflow-hidden rounded-3xl border-zinc-200 bg-white shadow-sm"
            >
              {/* Order Header */}
              <div className="flex flex-col gap-4 border-b border-zinc-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-semibold text-zinc-900">
                      Order #{order.id}
                    </h2>

                    <Badge className="rounded-full border-0 bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-50">
                      <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                      Delivered
                    </Badge>
                  </div>

                  <p className="mt-1 text-xs text-zinc-500">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-xs text-zinc-500">Order total</p>

                  <p className="text-xl font-bold text-[#3d593f]">
                    ${Number(order.totalPrice).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-900">Items</h3>

                  <span className="text-xs text-zinc-500">
                    {order.orderItems.length}{" "}
                    {order.orderItems.length === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="space-y-3">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          <Image
                            src={item.productImage}
                            alt="product image"
                            width={150}
                            height={50}
                            priority
                            className="h-auto w-35 object-contain sm:w-38.75   "
                          />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-zinc-900">
                            Product #{item.productId}
                          </p>

                          <p className="mt-0.5 text-xs text-zinc-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-zinc-900">
                        $
                        {(Number(item.price) * Number(item.quantity)).toFixed(
                          2,
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="my-5" />

                {/* Customer Details */}
                <div className="grid gap-4 text-sm sm:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-[#3d593f]/10 p-2">
                      <Mail className="h-4 w-4 text-[#3d593f]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-zinc-400">Email</p>

                      <p className="truncate font-medium text-zinc-700">
                        {order.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-[#3d593f]/10 p-2">
                      <Phone className="h-4 w-4 text-[#3d593f]" />
                    </div>

                    <div>
                      <p className="text-xs text-zinc-400">Phone</p>

                      <p className="font-medium text-zinc-700">{order.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-[#3d593f]/10 p-2">
                      <MapPin className="h-4 w-4 text-[#3d593f]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-zinc-400">Address</p>

                      <p className="truncate font-medium text-zinc-700">
                        {order.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default UserOrders;
