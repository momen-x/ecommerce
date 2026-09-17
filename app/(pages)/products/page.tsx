import { ProductsView } from "@/app/_modules/products/views/products-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "All products in the store",
  keywords: ["products", "nova cart", "e-commerce"],
};

const ProductsPage = () => {
  return <ProductsView />;
};

export default ProductsPage;
