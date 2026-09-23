export const productsQueryKeys = {
  all: ["products"] as const,
  filtered: (page?: number, limit?: number, categoryId?: number) =>
    [...productsQueryKeys.all, "filtered", page, limit, categoryId] as const,
  one: (id: number) => [...productsQueryKeys.all, "single", id] as const,
};
