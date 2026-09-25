"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Share2,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetOneProduct } from "../hooks/useGetOneProduct";
import QueryErrorState from "@/components/sharing/query-error-state";
import { useCreateOrderItem } from "../../order_item/hooks/useCreateOrderItems";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/app/_utils/get-axios-error-message";
import CardDetailsSkeleton from "@/components/skeletons/card-details-skeleton";

export function ProductDetailsView({ id }: { id: number }) {
  const [quantity, setQuantity] = useState<number>(1);
  const {
    data: product,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useGetOneProduct(id);
  const { mutate: createOrderItem, isPending: addToCartPending } =
    useCreateOrderItem();

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleAddToCart = async () => {
    await createOrderItem(
      {
        productId: id,
        quantity,
      },
      {
        onSuccess: () => {
          toast.success("Product added to cart");
          setQuantity(1);
        },
        onError: (error) => {
          toast.error(
            getErrorMessage(error) ?? "Failed to add product to cart",
          );
        },
      },
    );
  };

  if (isLoading) {
    return <CardDetailsSkeleton />;
  }
  if (isError) {
    <QueryErrorState
      title="Failed to load Product"
      description="We couldn’t load the product. Please try again"
      isRetrying={isRefetching}
      onRetry={() => refetch()}
    />;
  }
  if (!product) {
    return <div>Product not found</div>;
  }

  const numericPrice = product ? product?.price : 0;
  return (
    <section className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Product Image Display */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 shadow-sm group">
            <Image
              src={product?.imageUrl}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <Badge
              variant="secondary"
              className="absolute left-4 top-4 border-none bg-emerald-500/10 text-emerald-700 backdrop-blur-md dark:bg-emerald-950/80 dark:text-emerald-300 font-medium px-3 py-1"
            >
              In Stock
            </Badge>
          </div>
        </div>

        {/* Right Column: Product Information & Purchase Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Meta */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Link href={`/products?categoryId=${product.categoryId}`}>
                <Badge
                  variant="outline"
                  className="text-xs font-normal text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Tag className="mr-1 size-3" /> Category #{product.categoryId}
                </Badge>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                title="Share link"
              >
                <Share2 className="size-4" />
              </Button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {product.title}
            </h1>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              ${numericPrice}
            </span>
          </div>

          <br />

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200">
              Description
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {product.description}
            </p>
          </div>

          <br />

          {/* Quantity & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Quantity:
              </span>
              <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="size-3.5" />
                </Button>
                <span className="w-10 text-center text-sm font-semibold">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg"
                  onClick={handleIncreaseQuantity}
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={quantity <= 0}
                className={
                  addToCartPending
                    ? "cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-300 transition-colors shadow-none"
                    : "w-full flex-1 bg-[#3f6212] hover:bg-[#365314] text-white h-12 rounded-xl text-base font-medium transition-colors shadow-none"
                }
              >
                <ShoppingCart className="mr-2 size-5" />
                {addToCartPending ? "Adding to Cart..." : "Add to Cart"} • $
                {(numericPrice * quantity).toFixed(2)}
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <Truck className="size-4 text-emerald-700 shrink-0" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <RotateCcw className="size-4 text-emerald-700 shrink-0" />
              <span>30 Days Returns</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="size-4 text-emerald-700 shrink-0" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
