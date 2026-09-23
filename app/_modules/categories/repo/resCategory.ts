import { api } from "@/app/_utils/axiosInstance";
import { CategoryRepo } from "./category";
import { createCategoryData } from "../dto/create-category";
import { Category } from "../entities/category";
import { updateCategoryData } from "../dto/update-category";

const DOMAIN_URL = "/categories";

export const categoryRepo: CategoryRepo = {
  createCategory: async function (data: createCategoryData): Promise<Category> {
    const res = await api.post<Category>(DOMAIN_URL, data);
    return res.data;
  },
  getCategories: async function (): Promise<Category[]> {
    const res = await api.get<Category[]>(DOMAIN_URL);
    return res.data;
  },
  getCategoryById: async function (id: number): Promise<Category | null> {
    const res = await api.get<Category>(`${DOMAIN_URL}/${id}`);
    return res.data;
  },
  updateCategory: async function (
    id: number,
    data: updateCategoryData,
  ): Promise<Category> {
    const res = await api.put<Category>(`${DOMAIN_URL}/${id}`, data);
    return res.data;
  },
  deleteCategory: async function (id: number): Promise<{ message: string }> {
    const res = await api.delete(`${DOMAIN_URL}/${id}`).then((res) => res.data);
    return res;
  },
};
