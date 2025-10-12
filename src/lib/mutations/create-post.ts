"use server";

import { fromPromise } from "neverthrow";
import { createPostSchema } from "~/schemas/post";
import { db } from "../db";
import { privateProcedure } from "./procedures";

// export async function createPostAction(input: CreatePostSchema) {
//   const result = await createPost(input);

//   if (result.isOk()) revalidateTag("posts");

//   return resultToActionResponse(result);
// }

export const createPostAction = privateProcedure
  .createServerAction()
  .input(createPostSchema)
  .handler(async ({ input }) => {
    const result = fromPromise(db.post.create({ data: input }), (error) => ({
      type: "DATABASE_ERROR",
      error,
    })).map((data) => ({ id: data.id }));

    return (await result)._unsafeUnwrap();
  });
