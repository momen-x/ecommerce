export const userQueryKeys = {
  all: ["users"] as const,
  me: () => [...userQueryKeys.all, "me"] as const,
  one: (id: number) => [...userQueryKeys.all, "single", id] as const,
};
