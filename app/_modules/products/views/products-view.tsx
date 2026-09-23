"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetProductsWithFilteringAndPagination } from "../hooks/useGetProductsWithFilteringAndPagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategories } from "../../categories/hooks/useGetAllCategories";
import { ChildrenProps } from "@/app/_types/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CardSkeleton } from "@/components/skeletons/cards-skeletons";
import QueryErrorState from "@/components/sharing/query-error-state";
import ProductCard from "./product-card";


export function ProductsView({ children }: ChildrenProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categoryId = searchParams.get("categoryId") ?? "0";

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeCategoryId, setActiveCategoryId] = useState<number>(
    Number.isNaN(Number(categoryId)) ? 0 : Number(categoryId),
  );

  const { data, isLoading, isError, refetch, isFetching } =
    useGetProductsWithFilteringAndPagination(
      currentPage,
      2,
      activeCategoryId === 0 ? undefined : activeCategoryId,
    );
  const { data: categories } = useGetAllCategories();
 

  const handleCategoryChange = (value: string | null) => {
    const categoryId = value ? Number(value) : 0;

    setActiveCategoryId(categoryId);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "0") {
      params.set("categoryId", value);
    } else {
      params.delete("categoryId");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load Products"
        description="We couldn’t load the products. Please try again"
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
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
              className="h-9 min-w-45 rounded-lg border-muted bg-background text-xs font-medium focus:ring-1 focus:ring-emerald-600"
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : data?.products?.map((product) => (
              <Card
                key={product.id}
                className="group flex flex-col justify-between overflow-hidden border border-slate-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <ProductCard product={product} />

           
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
