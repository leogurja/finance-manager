import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "~/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(
  request: NextRequest,
  response: NextRequest,
) {
  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|_next|.*\\..*).*)",
};
