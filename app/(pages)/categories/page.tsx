import CategoriesView from "@/app/_modules/categories/views/categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore our categories of products",
  keywords: "categories, products, shopping",
};
const CategoryPage = () => {
  return <CategoriesView />;
};

export default CategoryPage;
