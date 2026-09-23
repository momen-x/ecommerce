import { ProductDetailsView } from "@/app/_modules/products/views/product-details";
import { ParamsProps } from "@/app/_types/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details",
  description: "Product Details Page",
  keywords: ["product", "details"],
  robots: "index, follow",
  alternates: {
    canonical:
      "https://ecommerce-pi-pied-10.vercel.app/products/[id]/product-details",
  },
};
const ProductDetailsPage = async ({ params }: ParamsProps) => {
  const { id } = await params;
  return (
    <div>
      <ProductDetailsView id={Number(id)} />
    </div>
  );
};

export default ProductDetailsPage;
