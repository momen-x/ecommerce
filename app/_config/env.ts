import z from "zod";

const envSchema = z.object({
  //   NODE_ENV: z
  //     .enum(["development", "test", "production"])
  //     .default("development"),

  NEXT_PUBLIC_API_URL: z.string().url(),
});
// Next.js requires direct references to inline public variables in client bundles.
export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
