import UpdateCategory from "@/app/_modules/categories/views/update-category";
import { ParamsProps } from "@/app/_types/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Category",
  description: "Update your category",
  keywords: ["update", "category", "e-commerce"],
};
const UpdateCategoryPage = async ({ params }: ParamsProps) => {
  const { id } = await params;
  return <UpdateCategory categoryId={Number(id)} />;
};

export default UpdateCategoryPage;
