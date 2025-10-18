"use server";

import { fromPromise } from "neverthrow";
import { createPostSchema } from "~/schemas/post";
import { db } from "../db";
import { privateProcedure } from "./procedures";

export const createPostAction = privateProcedure
  .inputSchema(createPostSchema)
  .action(async ({ parsedInput, ctx: { session } }) => {
    const result = fromPromise(
      db.post.create({ data: parsedInput }),
      (error) => ({
        type: "DATABASE_ERROR",
        error,
      }),
    ).map((data) => ({ id: data.id }));

    return (await result)._unsafeUnwrap();
  });
