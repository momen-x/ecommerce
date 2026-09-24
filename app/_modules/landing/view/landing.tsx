"use client";

import Link from "next/link";
import { useMemo } from "react";

import {
  ArrowRight,
  Loader2,
  PackageSearch,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import ProductCard from "@/app/_modules/products/views/product-card";
import { useGetProductsWithFilteringAndPagination } from "@/app/_modules/products/hooks/useGetProductsWithFilteringAndPagination";
import QueryErrorState from "@/components/sharing/query-error-state";
import { useGetAllCategories } from "../../categories/hooks/useGetAllCategories";
import { useGetUserOrders } from "../../order/hooks/useGetUserOrders";

const LandingContent = () => {
  const { data, isLoading, isError, refetch, isFetching } =
    useGetProductsWithFilteringAndPagination(1, 6);
  const { data: categories, isLoading: categoryLoading } =
    useGetAllCategories();

  const products = useMemo(() => data?.products ?? [], [data]);
  const { data: order } = useGetUserOrders();
  console.log("orders", order);

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative min-h-105 overflow-hidden rounded-3xl bg-[#f3efe7]">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/landing-hero.png')",
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-[#f5f1e9] via-[#f5f1e9]/85 to-transparent" />

          {/* Hero content */}
          <div className="relative z-10 flex min-h-105 max-w-xl flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
            <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#48634a]">
              LIVE BEAUTIFULLY
            </p>

            <h1 className="max-w-lg text-4xl font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Everyday essentials
              <br />
              for a brighter you
            </h1>

            <p className="mt-5 max-w-md text-sm leading-6 text-zinc-600 sm:text-base">
              Home, fashion, beauty, tech and more — thoughtfully selected for
              your everyday life.
            </p>

            <div className="mt-7">
              <Link href="/products">
                <Button className="h-11 rounded-xl bg-[#3d593f] px-6 text-white hover:bg-[#2d432f]">
                  Shop the Collection
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-600">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#3d593f]" />
                Great quality
              </span>

              <span className="flex items-center gap-2">
                <Truck className="size-4 text-[#3d593f]" />
                Fast & reliable
              </span>

              <span className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#3d593f]" />
                Better everyday
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Shop by Category
          </h2>

          <Link
            href="/categories"
            className="flex items-center gap-1 text-sm font-medium text-[#3d593f] hover:underline"
          >
            View all categories
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categoryLoading ? (
            <>loading categories...</>
          ) : (
            categories &&
            categories.map(({ title, id }) => (
              <Link
                key={title}
                href={`/products?categoryId=${id}`}
                className="group flex min-h-28 items-center gap-4 rounded-2xl border border-zinc-200 bg-[#faf9f6] p-4 transition-all hover:-translate-y-1 hover:border-[#69806a]/40 hover:shadow-md"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#e9efe7] text-[#3d593f]">
                  <PackageSearch className="size-6" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">
                    {title}
                  </h3>

                  <span className="mt-1 flex items-center text-xs text-zinc-500">
                    Explore
                    <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#59705b]">
              Our Picks
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Products
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Discover some of our newest products.
            </p>
          </div>

          <Link href="/products">
            <Button variant="ghost" className="hidden text-[#3d593f] sm:flex">
              View all
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>

        {isError ? (
          <QueryErrorState
            title="Failed to load products"
            description="We couldn't load the featured products. Please try again."
            isRetrying={isFetching}
            onRetry={() => refetch()}
          />
        ) : isLoading ? (
          <div className="flex min-h-72 items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="size-8 animate-spin text-[#3d593f]" />
              <span className="text-sm">Loading products...</span>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed py-16 text-center">
            <p className="text-sm text-muted-foreground">
              No products available yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Link href="/products">
          <Button
            variant="outline"
            className="mt-6 w-full rounded-xl sm:hidden"
          >
            View all products
          </Button>
        </Link>
      </section>

      {/* PROMOTIONAL BANNER */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#edf1e9]">
          <div className="grid min-h-64 grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#59705b]">
                Thoughtfully Selected
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
                Everyday essentials,
                <br />
                made better.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-zinc-600">
                Explore products designed to make your daily routine simpler,
                more comfortable, and a little brighter.
              </p>

              <Link href="/products">
                <Button className="mt-6 w-fit bg-[#3d593f] hover:bg-[#2d432f]">
                  Explore products
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>

            <div
              className="min-h-64 bg-cover bg-center"
              style={{
                backgroundImage: "url('/assets/categoryImage.png')",
              }}
            />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-y border-zinc-200 bg-[#f8faf6]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Truck className="size-7 shrink-0 text-[#3d593f]" />

            <div>
              <h3 className="text-sm font-semibold">Free Shipping</h3>

              <p className="text-xs text-muted-foreground">
                On eligible orders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="size-7 shrink-0 text-[#3d593f]" />

            <div>
              <h3 className="text-sm font-semibold">Secure Payment</h3>

              <p className="text-xs text-muted-foreground">
                Safe checkout experience
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ArrowRight className="size-7 shrink-0 text-[#3d593f]" />

            <div>
              <h3 className="text-sm font-semibold">Easy Shopping</h3>

              <p className="text-xs text-muted-foreground">
                Simple and intuitive experience
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Sparkles className="size-7 shrink-0 text-[#3d593f]" />

            <div>
              <h3 className="text-sm font-semibold">Quality Products</h3>

              <p className="text-xs text-muted-foreground">
                Selected for everyday life
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingContent;
