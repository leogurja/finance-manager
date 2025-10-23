import { headers } from 'next/headers';
import { createSafeActionClient } from 'next-safe-action';
import { auth } from '~/lib/auth/server';

export const publicProcedure = createSafeActionClient();

export const privateProcedure = publicProcedure.use(async ({ next }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  return next({
    ctx: {
      session,
    },
  });
});
