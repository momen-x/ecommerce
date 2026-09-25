"use client";

import QueryErrorState from "@/components/sharing/query-error-state";
import { useGetOneCategory } from "../hooks/useGetOneCategory";
import { CategoryForm } from "./category-form";
import FormSkeleton from "@/components/skeletons/form-skeleton";

const UpdateCategory = ({ categoryId }: { categoryId: number }) => {
  const {
    data: category,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetOneCategory(categoryId);

  if (isLoading) {
    return <FormSkeleton />;
  }
  if (!category || isError) {
    return (
      <QueryErrorState
        title="Failed to load Category"
        description="We couldn’t load the category. Please try again"
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div>
      <CategoryForm
        categoryId={categoryId}
        data={{
          description: category.description,
          title: category.title,
        }}
        goal="update"
      />
    </div>
  );
};

export default UpdateCategory;
