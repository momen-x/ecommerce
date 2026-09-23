import UpdateProduct from "@/app/_modules/products/views/update-product";
import { ParamsProps } from "@/app/_types/type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Product",
  description: "Update your product",
  keywords: ["update", "product", "e-commerce"],
};
const UpdateProductPage = async ({ params }: ParamsProps) => {
  const { id } = await params;
  return (
    <div>
      <UpdateProduct productId={Number(id)} />
    </div>
  );
};

export default UpdateProductPage;
