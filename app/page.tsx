import Image from "next/image";
import { ProductsView } from "./_modules/products/views/products-view";
import productsImg from "@/public/assets/products.png";
export default function Home() {
  return (
    <ProductsView>
      <Image
        src={productsImg}
        alt="Products"
        className="w-full h-64 object-cover"
      />
    </ProductsView>
  );
}
