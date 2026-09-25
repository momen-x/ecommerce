"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Product } from "../entities/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { useCreateOrderItem } from "../../order_item/hooks/useCreateOrderItems";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/app/_utils/get-axios-error-message";
import { useGetCurrentUser } from "../../user/hooks/useGetCurrentUser";

const ProductCard = ({ product }: { product: Product }) => {
  const { data: user } = useGetCurrentUser();

  const { mutate: createOrderItem, isPending } = useCreateOrderItem();
  const handleAddToCart = (productId: number) => {
    if (!user) {
      toast.info("Please login to add to cart");
      return;
    }
    createOrderItem(
      {
        productId,
        quantity: 1,
      },
      {
        onError: (error) => {
          toast.error(getErrorMessage(error ?? "some thing went wrong"));
        },
        onSuccess: () => {
          toast.success("Product added to cart");
        },
      },
    );
  };

  return (
    <Card>
      <CardContent className="p-0">
        {/* Image Display */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-50 dark:bg-slate-800">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />

          <Badge
            variant="secondary"
            className="absolute left-3 top-3 border-none bg-emerald-500/10 text-emerald-700 backdrop-blur-md dark:bg-emerald-950/80 dark:text-emerald-300"
          >
            New
          </Badge>
        </div>

        {/* Product Details */}
        <div className="space-y-1.5 p-4">
          <h3 className="line-clamp-1 font-medium text-slate-800 dark:text-slate-200">
            {product.title}
          </h3>

          <div className="pt-1 text-base font-bold text-slate-900 dark:text-white">
            ${Number(product.price).toFixed(2)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          onClick={() => handleAddToCart(product.id)}
          className="w-[50%] bg-[#3f6212] font-medium text-white shadow-none transition-colors hover:bg-[#365314]"
        >
          <ShoppingCart className="mr-2 size-4" />
          {isPending ? "Adding to Cart..." : "Add to Cart"}
        </Button>
        <Link
          href={`/products/${product.id}/product-details`}
          className="w-[50%]"
        >
          <Button className="w-full bg-[#085808] font-medium text-white shadow-none transition-colors hover:bg-teal-600">
            <Eye className="mr-2 size-4" /> View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
