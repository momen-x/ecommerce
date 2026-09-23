"use client";

import Link from "next/link";
import { Shirt, User, Baby, Sparkles, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Category } from "../entities/category";

interface CategoryCardProps {
  category: Category;
}

const getCategoryIcon = (title: string) => {
  const normalizedTitle = title.toLowerCase();
  if (normalizedTitle.includes("women"))
    return <Shirt className="size-5 text-rose-600" />;
  if (normalizedTitle.includes("men"))
    return <User className="size-5 text-sky-600" />;
  if (normalizedTitle.includes("kid") || normalizedTitle.includes("baby"))
    return <Baby className="size-5 text-amber-600" />;
  return <Sparkles className="size-5 text-emerald-600" />;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?categoryId=${category.id}`}
      className="group block h-full outline-none"
    >
      <Card className="h-full border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-emerald-600/40 rounded-2xl overflow-hidden">
        <CardContent className="p-6 flex flex-col justify-between h-full space-y-5">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 transition-transform duration-300 group-hover:scale-105">
              {getCategoryIcon(category.title)}
            </div>
            <Badge
              variant="secondary"
              className="text-[11px] font-normal bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-none px-2.5 py-0.5"
            >
              Category #{category.id}
            </Badge>
          </div>

          {/* Body Content */}
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-serif font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              {category.title}
              <ArrowUpRight className="size-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
              {category.description.trim()}
            </p>
          </div>

          {/* Footer Callout */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <span>Explore Collection</span>
            <span className="text-slate-400 group-hover:text-emerald-600 transition-colors">
              →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
