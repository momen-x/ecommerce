import CreateCategory from "@/app/_modules/categories/views/create-category";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Category",
  description: "Add new category",
  keywords: ["add", "category", "e-commerce"],
};

const CreateCategoryPage = () => {
  return <CreateCategory />;
};

export default CreateCategoryPage;
