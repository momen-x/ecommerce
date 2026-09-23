import { FormField } from "@/app/_types/type";
import { createCategoryData } from "../dto/create-category";
import { Mail, Text } from "lucide-react";

export const categoryFields = [
  {
    name: "title",
    title: "Enter category title",
    placeholder: "Enter category title",
    Icon: Text,
    type: "text",
  },
  {
    name: "description",
    title: "Enter category description",
    placeholder: "category description",
    Icon: Mail,
    type: "text",
  },
] satisfies FormField<keyof createCategoryData & string>[];
