"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Post } from "@prisma/client";
import type { ResultAsync } from "neverthrow";
import { use, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { createPostAction } from "~/lib/actions/create-post";
import type { SerializedResult } from "~/lib/utils/serialize-result";
import { createPostSchema } from "~/schemas/post";

interface LatestPostProps {
  latestPromise: Promise<SerializedResult<Post | null, Error>>;
}

export function LatestPost({ latestPromise }: LatestPostProps) {
  const latestPost = use(latestPromise);
  if (latestPost.error) throw latestPost.error;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const { id } = await createPostAction(values);
    console.log(id);
  });

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">
          Your most recent post: {latestPost.value?.name}
        </p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          {...register("name")}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
