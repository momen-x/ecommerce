/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/app/_utils/get-axios-error-message";

import { createProductData, createProductDto } from "../dto/create-product";

import { useCreateProduct } from "../hooks/useCreateProducts";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

import { productsFields as fields } from "../utils/fields";

import ValidationInput from "@/components/inputs/validation-input";
import ValidationSelect from "@/components/inputs/validation-select";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useGetAllCategories } from "../../categories/hooks/useGetAllCategories";
import QueryErrorState from "@/components/sharing/query-error-state";

interface ProductsFormProps {
  goal?: "add" | "update";
  productId?: number;
  data?: {
    categoryId: number;
    title: string;
    price: number;
    description: string;
  };
}

const ProductsForm = ({ goal = "add", productId, data }: ProductsFormProps) => {
  const router = useRouter();
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
    isFetching,
    refetch,
  } = useGetAllCategories();
  const form = useForm<createProductData>({
    resolver: zodResolver(createProductDto as any),

    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
      price: data?.price ?? 0,
      categoryId: data?.categoryId ?? 0,
      image: undefined,
    },

    mode: "onBlur",
  });

  const { mutate: createProduct, isPending: createLoading } =
    useCreateProduct();

  const { mutate: updateProduct, isPending: updateLoading } =
    useUpdateProduct();

  const isPending = createLoading || updateLoading;

  const isUpdate = goal === "update";

  const submitHandler = (values: createProductData) => {
    if (isUpdate) {
      updateProduct(
        {
          id: productId!,
          data: values,
        },
        {
          onSuccess() {
            toast.success("Product updated");
            router.push("/dashboard/products");
          },
          onError(error) {
            toast.error(getErrorMessage(error) ?? "Failed to update product");
          },
        },
      );

      return;
    }

    createProduct(values, {
      onSuccess() {
        toast.success("Product created");
        form.reset();
      },
      onError(error) {
        toast.error(getErrorMessage(error) ?? "Failed to create product");
      },
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
        <Card className="mx-auto w-full max-w-3xl">
          <CardContent className="grid gap-5 p-6">
            {fields.map(({ name, title, placeholder, Icon, type }) => (
              <ValidationInput<createProductData>
                key={name}
                fieldTitle={
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{title}</span>
                  </div>
                }
                nameInSchema={name}
                placeholder={placeholder}
                type={type}
                className="h-11 rounded-xl"
              />
            ))}

            {/* Category Select */}
            {/* todo update loading state */}
            {categoriesLoading ? (
              <div>Loading...</div>
            ) : categoriesError || !categories ? (
              <QueryErrorState
                description="field to fetch categories, please try again"
                title="Field to fetch categories"
                isRetrying={isFetching}
                onRetry={() => refetch()}
              />
            ) : (
              <ValidationSelect<createProductData>
                fieldTitle={
                  <div className="flex items-center gap-2">
                    <span>Category</span>
                  </div>
                }
                nameInSchema="categoryId"
                data={categories.map((item) => ({
                  id: item.id,
                  description: item.title,
                }))}
                className="h-11 rounded-xl"
              />
            )}

            {/* Image */}

            <Controller
              name="image"
              control={form.control}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                  className="block w-full rounded-xl border p-2"
                />
              )}
            />
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending
                ? "Saving..."
                : isUpdate
                  ? "Update Product"
                  : "Create Product"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

export default ProductsForm;
