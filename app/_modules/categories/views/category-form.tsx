"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { createCategoryData, createCategoryDto } from "../dto/create-category";

import { useCreateCategory } from "../hooks/useCreateCategory";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { categoryFields as fields } from "../utils/fields";

import { getErrorMessage } from "@/app/_utils/get-axios-error-message";

import logo from "@/public/assets/logo.png";

import { CardContent, CardFooter } from "@/components/ui/card";
import ValidationInput from "@/components/inputs/validation-input";
import { Button } from "@/components/ui/button";

interface CategoryFormProps {
  goal?: "add" | "update";
  categoryId?: number;
  data?: createCategoryData;
}

const CategoryForm = ({
  goal = "add",
  categoryId,
  data,
}: CategoryFormProps) => {
  const router = useRouter();

  const form = useForm<createCategoryData>({
    resolver: zodResolver(createCategoryDto),
    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
    },
    mode: "onBlur",
  });

  const { mutate: createCategory, isPending: createLoading } =
    useCreateCategory();

  const { mutate: updateCategory, isPending: updateLoading } =
    useUpdateCategory();

  const isUpdate = goal === "update";
  const isPending = createLoading || updateLoading;

  const handleFormSubmit = (formData: createCategoryData) => {
    if (isUpdate) {
      if (!categoryId) {
        toast.error("Category ID is required");
        return;
      }

      updateCategory(
        {
          categoryId,
          data: formData,
        },
        {
          onSuccess: () => {
            toast.success("Category updated successfully");
            router.push("/dashboard/categories");
          },
          onError: (error) => {
            toast.error(getErrorMessage(error) ?? "Failed to update category");
          },
        },
      );

      return;
    }

    createCategory(formData, {
      onSuccess: () => {
        toast.success("Category created successfully");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error) ?? "Failed to create category");
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-xl">
        <div className="p-8 sm:p-10">
          <Image
            src={logo}
            alt="NovaCart logo"
            width={150}
            height={50}
            priority
            className="h-auto w-35 object-contain sm:w-38.75"
          />

          <div className="mt-8">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {isUpdate ? "Update Category" : "Add Category"}
            </h1>

            <p className="mt-1.5 text-sm text-muted-foreground">
              {isUpdate
                ? "Update the category information below."
                : "Create a new product category."}
            </p>

            <FormProvider {...form}>
              <form
                id="category-form"
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="mt-6 space-y-6"
              >
                <CardContent className="p-0">
                  {fields.map(({ name, title, placeholder, Icon, type }) => (
                    <div key={name} className="mb-5 space-y-3">
                      <ValidationInput<createCategoryData>
                        fieldTitle={
                          <>
                            <span className="text-muted-foreground">
                              <Icon className="h-4 w-4" />
                            </span>

                            <span className="text-gray-700 dark:text-gray-200">
                              {title}
                            </span>
                          </>
                        }
                        nameInSchema={name as keyof createCategoryData}
                        placeholder={placeholder}
                        className="h-10 rounded-xl"
                        type={type}
                      />
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="flex-col gap-3 p-0">
                  <Button
                    type="submit"
                    disabled={isPending || !form.formState.isValid}
                    className="h-10 w-full bg-[#3f6212] font-medium text-white hover:bg-[#365314]"
                  >
                    {isPending
                      ? isUpdate
                        ? "Updating..."
                        : "Creating..."
                      : isUpdate
                        ? "Update Category"
                        : "Create Category"}
                  </Button>

                  <Link href="/dashboard/categories">
                    <Button type="button" variant="ghost" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </CardFooter>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CategoryForm };
