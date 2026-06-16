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

function needsSessionGate(pathname: string): boolean {
  if (pathname === "/admin/login") return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) return true;
  if (pathname.startsWith("/api/proyectos")) return true;
  if (pathname === "/api/tareas" || pathname.startsWith("/api/tareas/")) return true;
  if (pathname === "/api/crm" || pathname.startsWith("/api/crm/")) return true;
  if (pathname === "/api/plantillas" || pathname.startsWith("/api/plantillas/")) return true;
  if (pathname === "/api/colaboradores" || pathname.startsWith("/api/colaboradores/")) return true;
  if (pathname === "/api/propuestas" || pathname.startsWith("/api/propuestas/")) return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  if (hostname.includes("proyectos.darkrebel.store") && pathname === "/") {
    const toLogin = req.nextUrl.clone();
    toLogin.pathname = "/admin/login";
    return withSecurityHeaders(NextResponse.redirect(toLogin));
  }

  if (pathname === "/login") {
    const toLogin = req.nextUrl.clone();
    toLogin.pathname = "/admin/login";
    return withSecurityHeaders(NextResponse.redirect(toLogin));
  }

  if (!needsSessionGate(pathname)) {
    return withSecurityHeaders(NextResponse.next());
  }

  const isLoginPage = pathname === "/admin/login";
  const isApi = pathname.startsWith("/api/");

  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (isLoginPage) {
    if (session) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/dashboard";
      redirectUrl.search = "";
      return withSecurityHeaders(NextResponse.redirect(redirectUrl));
    }
    return withSecurityHeaders(NextResponse.next());
  }

  if (session && pathname === "/admin") {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";
    return withSecurityHeaders(NextResponse.redirect(redirectUrl));
  }

  if (!session) {
    if (isApi) {
      return withSecurityHeaders(NextResponse.json({ error: "No autorizado" }, { status: 401 }));
    }

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    redirectUrl.searchParams.set("next", pathname);
    return withSecurityHeaders(NextResponse.redirect(redirectUrl));
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|ttf|woff2?)$).*)",
  ],
};
