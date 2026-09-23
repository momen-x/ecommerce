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

const CartPayment = () => {
  const router = useRouter();

  const {
    data: cartData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useOrderCart();

  const handleStripeCheckout = () => {
    if (!cartData) {
      return;
    }
    // Add your Stripe redirect logic here
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
      <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-zinc-500 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#3d593f]" />
        <p className="text-sm">Loading checkout details...</p>
      </div>
    );
  }

  const totalPrice = Number(cartData.totalPrice) || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between max-w-xl mx-auto">
        {/* Step 1: Completed */}
        <div
          onClick={() => router.push("/cart")}
          className="flex items-center gap-2 cursor-pointer text-[#3d593f] font-semibold group"
        >
          <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-[#3d593f] text-white group-hover:bg-[#2d432f] transition-colors">
            <Check className="w-4 h-4" />
          </span>
          <span className="text-sm">Shipping Details</span>
        </div>

        <div className="flex-1 h-0.5 bg-[#3d593f] mx-4" />

        {/* Step 2: Active */}
        <div className="flex items-center gap-2 text-[#3d593f] font-semibold">
          <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-[#3d593f] text-white shadow-sm shadow-[#3d593f]/30">
            2
          </span>
          <span className="text-sm">Payment via Stripe</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Summary & Payment Option */}
        <div className="lg:col-span-8 space-y-6">
          {/* Shipping Info Review Card */}
          <Card className="p-6 border-zinc-200/80 rounded-2xl shadow-sm bg-white">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
              <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#3d593f]" />
                Shipping Details
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/cart")}
                className="rounded-xl text-xs border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900"
              >
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" /> Email
                </span>
                <p className="text-zinc-800 font-medium truncate">
                  {cartData.customerEmail || "Not provided"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" /> Phone
                </span>
                <p className="text-zinc-800 font-medium">
                  {cartData.phone || "Not provided"}
                </p>
              </div>

              <div className="space-y-1 md:col-span-1">
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" /> Address
                </span>
                <p className="text-zinc-800 font-medium truncate">
                  {cartData.address || "Not provided"}
                </p>
              </div>
            </div>
          </Card>

          {/* Stripe Option Card */}
          <Card className="p-6 border-zinc-200/80 rounded-2xl shadow-sm bg-white space-y-6">
            <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2 border-b pb-4 border-zinc-100">
              <CreditCard className="w-5 h-5 text-[#3d593f]" /> Payment Method
            </h2>

            <div className="bg-emerald-50/50 border border-emerald-200/60 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-2.5 bg-white rounded-xl shadow-xs text-[#3d593f] border border-emerald-100 shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-zinc-900">
                  Stripe Checkout
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  You will be securely redirected to Stripe to complete your
                  payment using Credit Card, Apple Pay, or Google Pay.
                </p>
              </div>
            </div>

            <Button
              onClick={handleStripeCheckout}
              className="w-full bg-[#3d593f] hover:bg-[#2d432f] text-white h-12 rounded-xl font-medium text-base shadow-sm transition-all flex items-center justify-center gap-2"
            >
              Pay ${totalPrice.toFixed(2)} with Stripe
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-4">
          <Card className="p-6 border-zinc-200/80 rounded-2xl shadow-sm bg-white space-y-5 sticky top-6">
            <h2 className="text-lg font-semibold text-zinc-900 border-b pb-3 border-zinc-100">
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

export default CartPayment;
