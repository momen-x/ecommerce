import { LucideIcon } from "lucide-react";
export interface ChildrenProps {
  children?: React.ReactNode;
}

export interface ParamsProps {
  params: Promise<{
    id: string;
  }>;
}


export type FormField<T extends string> = {
  name: T;
  title: string;
  placeholder: string;
  Icon: LucideIcon;
  type: "text" | "email" | "password" | "number" | "date" | "select";
};