export const productsQueryKeys = {
  all: ["products"] as const,
  filtered: (page?: number, limit?: number, catagoryid?: number) =>
    [...productsQueryKeys.all, "filtered", page, limit, catagoryid] as const,
  one: (id: number) => [...productsQueryKeys.all, "single", id] as const,
};
