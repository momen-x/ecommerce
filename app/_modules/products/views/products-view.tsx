"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsWithFiltaeringAndPagination } from "../hooks/useGetProductsWithFilteringAndPagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategories } from "../../categories/hooks/useGetAllCategories";
import { ChildernProps } from "@/app/_types/type";

export function ProductsView({ children }: ChildernProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeCategoryId, setActiveCategoryId] = useState<number>(0);

  const { data, isLoading, isError } =
    useGetProductsWithFiltaeringAndPagination(
      currentPage,
      12,
      activeCategoryId === 0 ? undefined : activeCategoryId,
    );

  const { data: categories } = useGetAllCategories();

  const handleCategoryChange = (value: string | null) => {
    setActiveCategoryId(value ? Number(value) : 0);
    setCurrentPage(1); // Reset to page 1 on category change
  };

  if (isError) {
    return (
      <div className="flex min-h-[300px] items-center justify-center font-medium text-rose-500">
        Failed to load products. Please try again.
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8 px-4 py-6">
      {/* Refined Filter & Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Filter Products</span>
        </div>

        {/* Clean Dropdown Filter */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="category-select"
            className="text-xs font-medium text-muted-foreground"
          >
            Category:
          </label>
          <Select
            value={String(activeCategoryId)}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger
              id="category-select"
              className="h-9 min-w-[180px] rounded-lg border-muted bg-background text-xs font-medium focus:ring-1 focus:ring-emerald-600"
            >
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="0" className="text-xs font-medium">
                All Categories
              </SelectItem>
              {categories?.map((category) => (
                <SelectItem
                  key={category.id}
                  value={String(category.id)}
                  className="text-xs"
                >
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {children}

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : data?.products?.map((product) => (
              <Card
                key={product.id}
                className="group flex flex-col justify-between overflow-hidden border border-slate-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <CardContent className="p-0">
                  {/* Image Display */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />

                    <Badge
                      variant="secondary"
                      className="absolute left-3 top-3 border-none bg-emerald-500/10 text-emerald-700 backdrop-blur-md dark:bg-emerald-950/80 dark:text-emerald-300"
                    >
                      New
                    </Badge>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-1.5 p-4">
                    <h3 className="line-clamp-1 font-medium text-slate-800 dark:text-slate-200">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        4.8
                      </span>
                      <span>(120)</span>
                    </div>

                    <div className="pt-1 text-base font-bold text-slate-900 dark:text-white">
                      ${Number(product.price).toFixed(2)}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-[#3f6212] font-medium text-white shadow-none transition-colors hover:bg-[#365314]">
                    <ShoppingCart className="mr-2 size-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>

      {/* Pagination Controls */}
      {Boolean(data?.products?.length && data.pageCount > 1) && (
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {data?.products.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{data?.count}</span>{" "}
            results
          </p>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8 rounded-lg"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-4" />
            </Button>

            {Array.from({ length: data?.pageCount ?? 0 }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  className={`size-8 rounded-lg ${
                    currentPage === page
                      ? "bg-[#3f6212] hover:bg-[#365314]"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ),
            )}

            <Button
              variant="outline"
              size="icon"
              className="size-8 rounded-lg"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, data?.pageCount ?? 1),
                )
              }
              disabled={currentPage === data?.pageCount}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between space-y-3 rounded-2xl border p-3">
      <Skeleton className="aspect-[4/3] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/4" />
      </div>
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
}
