import type { Post } from "@prisma/client/edge";

interface PolicyUser {
  id: string;
}

export function canCreatePost(user: PolicyUser | null) {
  return Boolean(user);
}

export function canEditPost(user: PolicyUser | null, post: Post) {
  if (user == null) return false;
  return post.id != null;
}
