import { Category } from "@/app/_modules/categories/entities/category";
export interface Product extends Category {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imagePublicId: string | null;
  categoryId: number;
}
