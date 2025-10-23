import { getSessionCookie } from 'better-auth/cookies';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '~/i18n/routing';

const handleI18nRouting = createMiddleware(routing);
const publicPaths = routing.locales.flatMap((locale) => [
  `/${locale}`,
  `/${locale}/login`,
]);

export default async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (sessionCookie == null && !publicPaths.includes(request.nextUrl.pathname))
    request.nextUrl.pathname = '/login';

  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|_next|.*\\..*).*)',
};
