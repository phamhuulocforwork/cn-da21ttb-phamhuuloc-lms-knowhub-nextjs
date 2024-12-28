import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Middleware xử lý auth và admin routes
const authMiddleware = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    // Nếu vào route admin mà không phải ADMIN -> redirect về home
    if (isAdminRoute && token?.role !== "ADMIN") {
      const locale = req.nextUrl.pathname.split("/")[1]; // Lấy locale từ URL
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function middleware(req: any) {
  const publicPatterns = ["/", "/login", "/register"];
  const isPublicPage = publicPatterns.some((pattern) =>
    req.nextUrl.pathname.startsWith(pattern),
  );

  // Với public pages -> chỉ xử lý i18n
  if (isPublicPage) {
    return intlMiddleware(req);
  }

  // Với protected pages -> xử lý cả auth và i18n
  return authMiddleware(req, req.nextUrl.pathname);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|auth/callback/google).*)",
  ],
};
