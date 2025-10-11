"use server";

import { revalidateTag } from "next/cache";
import { createPost } from "~/data/post/post";
import type { CreatePostSchema } from "~/schemas/post";
import { resultToActionResponse } from "../utils/result-to-action-response";

export async function createPostAction(input: CreatePostSchema) {
  const result = await createPost(input);

  if (result.isOk()) revalidateTag("posts");

  return resultToActionResponse(result);
}
