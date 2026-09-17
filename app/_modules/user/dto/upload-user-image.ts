import z from "zod";

export const uploadUserImageDto = z.object({
  image: z.instanceof(File, { message: "Enter a valid image file" }),
});

export type uploadUserImageData = z.infer<typeof uploadUserImageDto>;
