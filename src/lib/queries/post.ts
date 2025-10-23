import { fromPromise } from 'neverthrow';
import { cache } from 'react';
import 'server-only';
import { db } from '~/lib/db';

export const listPosts = cache(async () => {
  const rows = await fromPromise(
    db.post.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    (error) => ({ error, type: 'DATABASE_ERROR' }) as const,
  );

  return rows;
});

export const getLatest = cache(() => {
  return fromPromise(
    db.post.findFirst({
      orderBy: { createdAt: 'desc' },
    }),
    (error) => ({ error, type: 'DATABASE_ERROR' }) as const,
  );
});
