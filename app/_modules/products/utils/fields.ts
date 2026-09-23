import { FormField } from "@/app/_types/type";
import { createProductData } from "../dto/create-product";
import { DollarSign, Text } from "lucide-react";

export const productsFields = [
  {
    name: "title",
    title: "Product title",
    placeholder: "Enter product title",
    Icon: Text,
    type: "text",
  },
  {
    name: "description",
    title: "Product description",
    placeholder: "Enter product description",
    Icon: Text,
    type: "text",
  },
  {
    name: "price",
    title: "Product price",
    placeholder: "Enter product price",
    Icon: DollarSign,
    type: "number",
  },
] satisfies FormField<keyof createProductData & string>[];
