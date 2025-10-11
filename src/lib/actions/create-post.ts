"use server";

import { revalidateTag } from "next/cache";
import { createPost } from "~/data/post/post";
import type { CreatePostSchema } from "~/schemas/post";
import { serializeResult } from "../utils/serialize-result";

export async function createPostAction(input: CreatePostSchema) {
  const result = await createPost(input);

  if (result.isOk()) revalidateTag("posts");

  return serializeResult(result);
}
