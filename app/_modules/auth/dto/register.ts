import z from "zod";

export const registerDto = z.object({
  email: z.string().email(),
  password: z.string().min(6).trim(),
  firstName: z.string().min(3).max(50).trim(),
  lastName: z.string().min(3).max(50).trim(),
});

export type registerData = z.infer<typeof registerDto>;

export const registerFormDto = registerDto
  .extend({
    confirmPassword: z.string().min(6).trim(),
    isAgree: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export type registerFormData = z.infer<typeof registerFormDto>;

export type registerForm = z.infer<typeof registerFormDto>;
