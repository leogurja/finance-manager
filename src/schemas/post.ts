import z from "zod";

export const createPostSchema = z.object({ name: z.string().min(1) });
export type CreatePostSchema = z.infer<typeof createPostSchema>;
