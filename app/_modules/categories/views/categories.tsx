"use client";

import { CardSkeleton } from "@/components/skeletons/cards-skeletons";
import { useGetAllCategories } from "../hooks/useGetAllCategories";
import QueryErrorState from "@/components/sharing/query-error-state";
import { CategoryCard } from "./category-card";

const CategoriesView = () => {
  const {
    data: categories,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetAllCategories();

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return (
      <QueryErrorState
        title="Failed to load Categories"
        description="We couldn’t load the categories. Please try again"
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <section className="container mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Shop by Category
        </h2>
        <p className="text-sm text-muted-foreground">
          Browse our curated collection of everyday fashion and essentials.
        </p>
      </div>

      {/* Grid wrapper correctly housing the map */}
      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 space-y-2 border border-dashed rounded-2xl">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            No categories found
          </h3>
          <p className="text-xs text-muted-foreground">
            Check back later for new arrivals and collections.
          </p>
        </div>
      )}
    </section>
  );
};

export default CategoriesView;
