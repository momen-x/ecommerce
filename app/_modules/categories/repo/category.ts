import { Category } from "../entities/category";
import { createCategoryData } from "../dto/create-category";
import { updateCategoryData } from "../dto/update-category";

export interface CategoryRepo {
  createCategory: (data: createCategoryData) => Promise<Category>;
  getCategories: () => Promise<Category[]>;
  getCategoryById: (id: number) => Promise<Category | null>;
  updateCategory: (id: number, data: updateCategoryData) => Promise<Category>;
  deleteCategory: (id: number) => Promise<{ message: string }>;
}
