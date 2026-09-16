import { CreateProductData } from "../dto/create-product";
import { UpdateProductData } from "../dto/update-product";
import { Products } from "../entities/products";

export interface ProductRepo {
  createProduct: (data: CreateProductData) => Promise<Products>;
  getProductsWithFiltaeringAndPagination: (
    page?: number,
    limit?: number,
    catagoryId?: number,
  ) => Promise<Products[]>;
  getProductById: (id: number) => Promise<Products | null>;
  updateProduct: (id: number, data: UpdateProductData) => Promise<Products>;
  deleteProduct: (id: number) => Promise<{ message: string }>;
}
