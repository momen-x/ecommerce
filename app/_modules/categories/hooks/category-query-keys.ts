export const categoryQueryKeys = {
  all: ["categories"] as const,
  one: (id: number) => [...categoryQueryKeys.all, "single", id] as const,
};
