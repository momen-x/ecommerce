"use client";

import QueryErrorState from "@/components/sharing/query-error-state";
import { useGetOneCategory } from "../hooks/useGetOneCategory";
import { CategoryForm } from "./category-form";

const UpdateCategory = ({ categoryId }: { categoryId: number }) => {
  const {
    data: category,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetOneCategory(categoryId);

  //todo update loading state
  if (isLoading) {
    return <>loading.....</>;
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
