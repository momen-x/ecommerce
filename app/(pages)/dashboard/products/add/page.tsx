import CreateProduct from "@/app/_modules/products/views/create-product";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product",
  description: "Add new product",
  keywords: ["add", "product", "e-commerce"],
};
const AddProductPage = () => {
  return (
    <div>
      <CreateProduct />
    </div>
  );
};

export default AddProductPage;
