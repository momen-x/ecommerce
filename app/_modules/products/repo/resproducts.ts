import { api } from "@/app/_utils/axiosInstance";
import { ExtendedProducts, ProductRepo } from "./products";
import { createProductData } from "../dto/create-product";
import { UpdateProductData } from "../dto/update-product";
import { Product } from "../entities/products";

const DOMAIN_URL = "/products";
export const productRepo: ProductRepo = {
  createProduct: async function (data: createProductData): Promise<Product> {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("price", String(data.price));
    formData.append("categoryId", String(data.categoryId));
    const res = await api.post<Product>(DOMAIN_URL, formData);
    return res.data;
  },
  getProductsWithFilteringAndPagination: async function (
    page?: number,
    limit = 10,
    categoryId = 0,
  ): Promise<ExtendedProducts> {
    if (categoryId === 0) {
      const res = await api.get<ExtendedProducts>(
        `${DOMAIN_URL}?page=${page}&limit=${limit}`,
      );
      return res.data;
    }
    const res = await api.get<ExtendedProducts>(
      `${DOMAIN_URL}/categories/${categoryId}?page=${page}&limit=${limit}`,
    );
    return res.data;
  },
  getProductById: async function (id: number): Promise<Product | null> {
    const res = await api.get<Product | null>(`${DOMAIN_URL}/${id}`);
    return res.data;
  },
  updateProduct: async function (
    id: number,
    data: UpdateProductData,
  ): Promise<Product> {
    const formData = new FormData();
    if (data.title !== undefined) formData.append("title", data.title);
    if (data.description !== undefined)
      formData.append("description", data.description);
    if (data.image !== undefined) formData.append("image", data.image);
    if (data.price !== undefined) formData.append("price", String(data.price));
    if (data.categoryId !== undefined)
      formData.append("categoryId", String(data.categoryId));

    const res = await api.put<Product>(`${DOMAIN_URL}/${id}`, formData);
    return res.data;
  },
  deleteProduct: async function (id: number): Promise<{ message: string }> {
    const res = await api.delete(`${DOMAIN_URL}/${id}`).then((res) => res.data);
    return res;
  },
};
