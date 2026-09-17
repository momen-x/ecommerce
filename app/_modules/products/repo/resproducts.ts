import { api } from "@/app/_utils/axiosInstance";
import { ExtendedProducts, ProductRepo } from "./products";
import { CreateProductData } from "../dto/create-product";
import { UpdateProductData } from "../dto/update-product";
import { Products } from "../entities/products";

const DOMAIN_URL = "/products";
export const productRepo: ProductRepo = {
  createProduct: async function (data: CreateProductData): Promise<Products> {
    const res = await api.post<Products>(DOMAIN_URL, data);
    return res.data;
  },
  getProductsWithFiltaeringAndPagination: async function (
    page?: number,
    limit = 10,
    catagoryId = 0,
  ): Promise<ExtendedProducts> {
    if (catagoryId === 0) {
      const res = await api.get<ExtendedProducts>(
        `${DOMAIN_URL}?page=${page}&limit=${limit}`,
      );
      return res.data;
    }
    const res = await api.get<ExtendedProducts>(
      `${DOMAIN_URL}/categories/${catagoryId}?page=${page}&limit=${limit}`,
    );
    return res.data;
  },
  getProductById: async function (id: number): Promise<Products | null> {
    const res = await api.get<Products | null>(`${DOMAIN_URL}/${id}`);
    return res.data;
  },
  updateProduct: async function (
    id: number,
    data: UpdateProductData,
  ): Promise<Products> {
    const res = await api.put<Products>(`${DOMAIN_URL}/${id}`, data);
    return res.data;
  },
  deleteProduct: async function (id: number): Promise<{ message: string }> {
    const res = await api.delete(`${DOMAIN_URL}/${id}`).then((res) => res.data);
    return res;
  },
};
