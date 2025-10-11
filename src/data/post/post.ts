import "server-only";
import { requireUser } from "../user/require-user";
import { db } from "~/lib/db";
import { createPostSchema, type CreatePostSchema } from "~/schemas/post";
import { DatabaseError } from "~/lib/errors/database-error";
import { cache } from "react";
import { err, fromPromise } from "neverthrow";

export const listPosts = cache(async () => {
  const rows = await fromPromise(
    db.post.findMany({
      orderBy: { createdAt: "desc" },
    }),
    (err) => new DatabaseError("Couldn't create post", { cause: err }),
  );

  return rows;
});

export function createPost(input: CreatePostSchema) {
  requireUser();
  const { data, error } = createPostSchema.safeParse(input);

  if (error) return err(error);

  return fromPromise(
    db.post.create({ data }),
    (err: unknown) =>
      new DatabaseError("failed to create post", { cause: err }),
  ).map((data) => ({ id: data.id }));
}

export function getLatest() {
  return fromPromise(
    db.post.findFirst({
      orderBy: { createdAt: "desc" },
    }),
    (err: unknown) =>
      new DatabaseError("failed to get latest post", { cause: err }),
  );
}
