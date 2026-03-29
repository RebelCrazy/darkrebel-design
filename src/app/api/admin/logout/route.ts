import { NextResponse } from "next/server";
import { getSessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth";

export const runtime = "edge";


async function handleLogout(req: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", req.url), 303);
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    ...getSessionCookieOptions(),
    maxAge: 0
  });
  return response;
}

export const POST = handleLogout;
export const GET = handleLogout;
