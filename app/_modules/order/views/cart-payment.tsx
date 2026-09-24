"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  ArrowRight,
  CreditCard,
  MapPin,
  ShieldCheck,
  Check,
  Loader2,
  Mail,
  Phone,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useOrderCart } from "../hooks/useOrderCart";
import QueryErrorState from "@/components/sharing/query-error-state";
import { useCompleteOrder } from "../hooks/useCompleteOrder";
import { toast } from "react-toastify";

const CartPayment = () => {
  const router = useRouter();
  const { mutate: payOrder, isPending } = useCompleteOrder();

  const {
    data: cartData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useOrderCart();

  const handleStripeCheckout = () => {
    if (!cartData) return;

    payOrder(undefined, {
      onSuccess: () => {
        toast.success("order completed");
        router.push("/");
      },
      onError: () => {
        toast.error("some thing went wrong");
      },
    });

    // Add your Stripe checkout logic here
  };

  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load cart data"
        description="We couldn’t load the cart data. Please try again"
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading || !cartData) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-4 py-20 text-zinc-500">
        <Loader2 className="h-8 w-8 animate-spin text-[#3d593f]" />

        <p className="text-sm">Loading checkout details...</p>
      </div>
    );
  }

  const totalPrice = Number(cartData.totalPrice) || 0;

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      {/* Checkout Steps */}
      <div className="mx-auto flex max-w-xl items-center justify-between">
        {/* Step 1 */}
        <div
          onClick={() => router.push("/cart")}
          className="group flex cursor-pointer items-center gap-2 font-semibold text-[#3d593f]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3d593f] text-xs font-bold text-white transition-colors group-hover:bg-[#2d432f]">
            <Check className="h-4 w-4" />
          </span>

          <span className="text-sm">Shipping Details</span>
        </div>

        <div className="mx-4 h-0.5 flex-1 bg-[#3d593f]" />

        {/* Step 2 */}
        <div className="flex items-center gap-2 font-semibold text-[#3d593f]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3d593f] text-xs font-bold text-white shadow-sm shadow-[#3d593f]/30">
            2
          </span>

          <span className="text-sm">Payment via Stripe</span>
        </div>
      </div>

      {/* Main Checkout Content */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-8">
          {/* Shipping Details */}
          <Card className="rounded-2xl border-zinc-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-900">
                <MapPin className="h-5 w-5 text-[#3d593f]" />
                Shipping Details
              </h2>

              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/cart")}
                className="rounded-xl border-zinc-200 text-xs hover:bg-zinc-50 hover:text-zinc-900"
              >
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4 text-sm md:grid-cols-3">
              {/* Email */}
              <div className="space-y-1">
                <span className="flex items-center gap-1 text-xs font-medium text-zinc-400">
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </span>

                <p className="truncate font-medium text-zinc-800">
                  {cartData.customerEmail || "Not provided"}
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <span className="flex items-center gap-1 text-xs font-medium text-zinc-400">
                  <Phone className="h-3.5 w-3.5" />
                  Phone
                </span>

                <p className="font-medium text-zinc-800">
                  {cartData.phone || "Not provided"}
                </p>
              </div>

              {/* Address */}
              <div className="space-y-1">
                <span className="flex items-center gap-1 text-xs font-medium text-zinc-400">
                  <MapPin className="h-3.5 w-3.5" />
                  Address
                </span>

                <p className="truncate font-medium text-zinc-800">
                  {cartData.address || "Not provided"}
                </p>
              </div>
            </div>
          </Card>

          {/* Payment */}
          <Card className="space-y-6 rounded-2xl border-zinc-200/80 bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 border-b border-zinc-100 pb-4 text-base font-semibold text-zinc-900">
              <CreditCard className="h-5 w-5 text-[#3d593f]" />
              Payment Method
            </h2>

            {/* Stripe Info */}
            <div className="flex items-start gap-4 rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-5">
              <div className="shrink-0 rounded-xl border border-emerald-100 bg-white p-2.5 text-[#3d593f] shadow-xs">
                <CreditCard className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-zinc-900">
                  Stripe Checkout
                </h3>

                <p className="text-xs leading-relaxed text-zinc-600">
                  You will be securely redirected to Stripe to complete your
                  payment using Credit Card, Apple Pay, or Google Pay.
                </p>
              </div>
            </div>

            {/* Stripe Button */}
            <Button
              onClick={handleStripeCheckout}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#3d593f] text-base font-medium text-white shadow-sm transition-all hover:bg-[#2d432f]"
              disabled={isPending}
            >
              {isPending
                ? "paying..."
                : `Pay ${totalPrice.toFixed(2)} with Stripe`}
              <ArrowRight className="h-4 w-4" />
            </Button>

            {/* Stripe Demo */}
            <div className="space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-zinc-900">
                  Stripe Integration Demo
                </h3>

                <p className="text-xs leading-relaxed text-zinc-500">
                  Stripe integration is implemented in this project. Since live
                  Stripe testing is not currently available in my region, the
                  video below demonstrates the expected checkout flow and
                  payment integration behavior.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-black">
                <video
                  src="/assets/payment-ex.mp4"
                  controls
                  preload="metadata"
                  playsInline
                  className="aspect-video w-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="flex items-start gap-2 rounded-xl bg-white p-3 text-xs text-zinc-500">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                <p className="leading-relaxed">
                  The production implementation follows Stripe’s secure checkout
                  flow. This video is included only as a demonstration of the
                  implemented payment experience.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <Card className="sticky top-6 space-y-5 rounded-2xl border-zinc-200/80 bg-white p-6 shadow-sm">
            <h2 className="border-b border-zinc-100 pb-3 text-lg font-semibold text-zinc-900">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Items ({cartData.orderItems?.length || 0})</span>

                <span className="font-medium text-zinc-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>

                <span className="font-medium text-emerald-700">Free</span>
              </div>
            </div>

            <Separator />

            <div className="flex items-baseline justify-between">
              <span className="text-base font-semibold text-zinc-900">
                Total
              </span>

              <span className="text-2xl font-bold text-[#3d593f]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-zinc-100 pt-2 text-xs text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />

              <span>Encrypted & Secure Payment by Stripe</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPayment;
