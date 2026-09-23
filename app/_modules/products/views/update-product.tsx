"use client";

import QueryErrorState from "@/components/sharing/query-error-state";
import { useGetOneProduct } from "../hooks/useGetOneProduct";
import ProductsForm from "./products-form";

const UpdateProduct = ({ productId }: { productId: number }) => {
  const {
    data: product,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetOneProduct(productId);
  //todo update is loading state
  if (isLoading) return <>loading...</>;

  if (!product || isError) {
    return (
      <QueryErrorState
        title="field to fetch the product"
        description="field to fetch the product, try again"
        isRetrying={isFetching}
        onRetry={() => refetch()}
      />
    );
  }
  return (
    <div>
      <ProductsForm
        data={{
          categoryId: product.categoryId,
          title: product.title,
          price: product.price,
          description: product.description,
        }}
        goal="update"
        productId={productId}
      />
    </div>
  );
};

export default UpdateProduct;
