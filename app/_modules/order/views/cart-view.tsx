"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useOrderCart } from "../hooks/useOrderCart";
import { useGetCurrentUser } from "../../user/hooks/useGetCurrentUser";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateOrderData, updateOrderDto } from "../dto/update-order";
import { useUpdateOrder } from "../hooks/useUpdateOrder";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/app/_utils/get-axios-error-message";
import { updateOrderFields as fields } from "../utils/fields";
import ValidationInput from "@/components/inputs/validation-input";
import { useRouter } from "next/navigation";

const CartView = () => {
  const { data: cartData, isLoading } = useOrderCart();
  const { mutate: updateOrder, isPending: isUpdating } = useUpdateOrder();
  const { data: user } = useGetCurrentUser();
  const router = useRouter();

  // Form State for User Details
  const form = useForm<updateOrderData>({
    resolver: zodResolver(updateOrderDto as any),
    defaultValues: {
      address: "",
      customerEmail: "",
      phone: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!cartData) return;

    form.reset({
      address: cartData.address ?? "",
      customerEmail: cartData.customerEmail ?? "",
      phone: cartData.phone ?? "",
    });
  }, [cartData, form]);

  const {
    formState: { isDirty, isValid },
  } = form;

  const onSubmit = (data: updateOrderData) => {
    if (!cartData) return;

    if (!isDirty) {
      router.push("/cart/payment");
      return;
    }

    updateOrder(
      { id: cartData.id, data },
      {
        onSuccess: () => {
          toast.success("Order updated successfully");
          form.reset(data);
          router.push("/cart/payment");
        },
        onError: (error) => {
          toast.error(getErrorMessage(error) ?? "Failed to update order");
        },
      },
    );
  };

  const orderItems = cartData?.orderItems || [];
  const totalPrice = Number(cartData?.totalPrice) || 0;

  if (!user) {
    return <></>;
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-zinc-500">
        Loading cart details...
      </div>
    );
  }

  if (!cartData || orderItems.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 text-center bg-white rounded-2xl border border-zinc-100 shadow-sm">
        <div className="w-16 h-16 bg-[#3d593f]/10 text-[#3d593f] rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-800">
          Your cart is empty
        </h2>
        <p className="text-sm text-zinc-500 mt-1 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link href="/shop">
          <Button className="bg-[#3d593f] hover:bg-[#2d432f] text-white rounded-xl px-6">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header Stepper */}
      <div className="flex items-center justify-between max-w-xl mx-auto">
        <div
          onClick={() => router.push("/cart")}
          className="flex items-center gap-2 cursor-pointer text-[#3d593f] font-semibold"
        >
          <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-[#3d593f] text-white">
            1
          </span>
          <span>Shipping Details</span>
        </div>

        <div className="flex-1 h-0.5 bg-zinc-200 mx-4" />

        <div className="flex items-center gap-2 text-zinc-400 font-medium">
          <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-zinc-100 text-zinc-500">
            2
          </span>
          <span>Payment via Stripe</span>
        </div>
      </div>

      {/* 1. Cart Items (أعلى الصفحة) */}
      <Card className="p-6 border-zinc-200/80 rounded-2xl shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-zinc-900 mb-4 border-b pb-3 border-zinc-100">
          Items in your cart ({orderItems.length})
        </h3>
        <div className="divide-y divide-zinc-100">
          {orderItems.map((item: any) => (
            <div
              key={item.id}
              className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center"
            >
              <div className="relative w-16 h-16 bg-zinc-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-zinc-400">
                <ShoppingBag className="w-6 h-6 opacity-40" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-zinc-900 text-sm truncate">
                  Product #{item.productId}
                </h4>
                <p className="text-xs text-zinc-500">${item.price} each</p>
              </div>

              <div className="flex items-center gap-2 border border-zinc-200 rounded-lg p-1 bg-zinc-50/50">
                <button
                  className="w-6 h-6 flex items-center justify-center rounded text-zinc-600 hover:bg-white transition-all disabled:opacity-30"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-4 text-center text-xs font-medium text-zinc-800">
                  {item.quantity}
                </span>
                <button className="w-6 h-6 flex items-center justify-center rounded text-zinc-600 hover:bg-white transition-all">
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <span className="font-semibold text-zinc-900 text-sm min-w-15 text-right">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </span>

              <button className="p-1 text-zinc-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* 2. Form & Order Summary (أسفل المنتجات) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Shipping Form (أسفل يسار) */}
        <div className="lg:col-span-8">
          <Card className="p-6 border-zinc-200/80 rounded-2xl shadow-sm bg-white">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2 border-b pb-3 border-zinc-100">
              <User className="w-5 h-5 text-[#3d593f]" /> Shipping Information
            </h2>

            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* User First & Last Name Inputs */}
                {user && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-xs font-medium text-zinc-600"
                      >
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="Jane"
                        value={user.firstName}
                        disabled
                        className="rounded-xl bg-zinc-50/50 border-zinc-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-xs font-medium text-zinc-600"
                      >
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Doe"
                        value={user.lastName}
                        disabled
                        className="rounded-xl bg-zinc-50/50 border-zinc-200"
                      />
                    </div>
                  </div>
                )}

                {/* Dynamic Form Fields */}
                <div className="space-y-4">
                  {cartData &&
                    fields.map(({ name, title, placeholder, Icon, type }) => (
                      <div key={name} className="space-y-2">
                        <ValidationInput<updateOrderData>
                          fieldTitle={
                            <div className="flex items-center gap-2 mb-1 text-xs font-medium text-zinc-600">
                              <Icon className="h-4 w-4 text-[#3d593f]" />
                              <span>{title}</span>
                            </div>
                          }
                          nameInSchema={name as keyof updateOrderData}
                          placeholder={placeholder}
                          className="h-11 rounded-xl border-zinc-200 focus:border-[#3d593f]"
                          type={type}
                        />
                      </div>
                    ))}
                </div>

                {/* Submit / Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-zinc-100">
                  <Button
                    type="submit"
                    className="w-full sm:w-1/2 bg-[#3d593f] hover:bg-[#2d432f] text-white h-11 rounded-xl font-medium disabled:opacity-40 transition-colors"
                    disabled={!isValid || isDirty}
                  >
                    Continue to Payment <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button
                    type="submit"
                    className="w-full sm:w-1/2 bg-[#3d593f] hover:bg-[#2d432f] text-white h-11 rounded-xl font-medium disabled:opacity-40 transition-colors"
                    disabled={!isValid || !isDirty || isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update data and continue"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </Card>
        </div>

        {/* Right Side: Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <Card className="p-6 border-zinc-200/80 rounded-2xl shadow-sm bg-white space-y-5 sticky top-6">
            <h2 className="text-lg font-semibold text-zinc-900 border-b pb-3 border-zinc-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-medium text-zinc-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span className="text-emerald-700 font-medium">Free</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-baseline">
              <span className="text-base font-semibold text-zinc-900">
                Total
              </span>
              <span className="text-2xl font-bold text-[#3d593f]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 pt-2 border-t border-zinc-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Encrypted & Secure Payment by Stripe</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartView;
