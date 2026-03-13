import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=() ");
  return response;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isProtectedAdmin = pathname.startsWith("/admin");
  const isProtectedApi = pathname.startsWith("/api/proyectos");

  if (!isProtectedAdmin && !isProtectedApi) {
    return withSecurityHeaders(NextResponse.next());
  }

  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (isLoginPage) {
    if (session) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/admin";
      return withSecurityHeaders(NextResponse.redirect(redirectUrl));
    }

    return withSecurityHeaders(NextResponse.next());
  }

  if (!session) {
    if (isProtectedApi) {
      return withSecurityHeaders(
        NextResponse.json({ error: "No autorizado" }, { status: 401 })
      );
    }

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.searchParams.set("next", pathname);
    return withSecurityHeaders(NextResponse.redirect(redirectUrl));
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*", "/api/proyectos/:path*"]
};
