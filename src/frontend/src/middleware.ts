import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { withAuth } from "next-auth/middleware";

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth({
  pages: {
    signIn: "/login",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function middleware(req: any) {
  const publicPatterns = ["/", "/login", "/register"];
  const isPublicPage = publicPatterns.some((pattern) =>
    req.nextUrl.pathname.startsWith(pattern),
  );

  if (isPublicPage) {
    return intlMiddleware(req);
  }

  return authMiddleware(req, req.nextUrl.pathname);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|auth/callback/google).*)",
  ],
};
