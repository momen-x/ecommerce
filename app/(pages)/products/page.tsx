import { ProductsView } from "@/app/_modules/products/views/products-view";
import { Metadata } from "next";
import Image from "next/image";
import productsImg from "@/public/assets/products.png";

export const metadata: Metadata = {
  title: "Products",
  description: "All products in the store",
  keywords: ["products", "nova cart", "e-commerce"],
};

const ProductsPage = () => {
  return (
    <ProductsView>
      <Image
        src={productsImg}
        alt="Products"
        className="w-full h-64 object-cover"
      />
    </ProductsView>
  );
};

export default ProductsPage;
