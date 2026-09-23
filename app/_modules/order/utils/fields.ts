import { FormField } from "@/app/_types/type";
import { updateOrderData } from "../dto/update-order";
import { Mail, MapPinHouse, Phone } from "lucide-react";

export const updateOrderFields = [
  {
    name: "customerEmail",
    title: "Enter customer email",
    placeholder: "example@example.com",
    Icon: Mail,
    type: "email",
  },
  {
    name: "phone",
    title: "Enter customer phone number",
    placeholder: "Enter customer phone number",
    Icon: Phone,
    type: "text",
  },
  {
    name: "address",
    title: "Enter your Address",
    placeholder: "Enter your Address",
    Icon: MapPinHouse,
    type: "text",
  },
] satisfies FormField<keyof updateOrderData & string>[];
