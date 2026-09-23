import { Category } from "../../categories/entities/category";
import { createProductData } from "../dto/create-product";
import { UpdateProductData } from "../dto/update-product";
import { Product } from "../entities/products";

export interface ExtendedProducts {
  success: boolean;
  count: number;
  pageCount: number;
  products: Product[];
  category: Category;
}

export interface ProductRepo {
  createProduct: (data: createProductData) => Promise<Product>;
  getProductsWithFilteringAndPagination: (
    page?: number,
    limit?: number,
    categoryId?: number,
  ) => Promise<ExtendedProducts>;
  getProductById: (id: number) => Promise<Product | null>;
  updateProduct: (id: number, data: UpdateProductData) => Promise<Product>;
  deleteProduct: (id: number) => Promise<{ message: string }>;
}
