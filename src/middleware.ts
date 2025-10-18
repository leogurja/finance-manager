import { getSessionCookie } from "better-auth/cookies";
import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { routing } from "~/i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const publicPaths = routing.locales
  .map((locale) => [`/${locale}`, `/${locale}/login`])
  .flat();

export default async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (sessionCookie == null && !publicPaths.includes(request.nextUrl.pathname))
    request.nextUrl.pathname = "/login";

  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|_next|.*\\..*).*)",
};
