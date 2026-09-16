import { Category } from "../entities/category";
import { CreateCategoryData } from "../dto/create-category";
import { UpdateCategoryData } from "../dto/update-category";

export interface CategoryRepo {
  createCategory: (data: CreateCategoryData) => Promise<Category>;
  getCategories: () => Promise<Category[]>;
  getCategoryById: (id: number) => Promise<Category | null>;
  updateCategory: (id: number, data: UpdateCategoryData) => Promise<Category>;
  deleteCategory: (id: number) => Promise<{ message: string }>;
}
