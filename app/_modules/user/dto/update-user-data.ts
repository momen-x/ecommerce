import z from "zod";

export const updateUserData = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters long"),
  lastName: z.string().min(3, "Last name must be at least 3 characters long"),
});
export type UpdateUserData = z.infer<typeof updateUserData>;
