import { NextResponse } from "next/server";
import {
  createSessionToken,
  getSessionCookieOptions,
  isTrustedOrigin,
  SESSION_COOKIE_NAME,
  verifyAdminCredentials
} from "@/lib/auth";

// export const runtime = "edge"; // Eliminado para usar runtime Node.js

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  const formData = await req.formData();
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  const isValid = await verifyAdminCredentials(username, password);
  if (!isValid) {
    return NextResponse.redirect(new URL("/admin/login?error=1", req.url), 303);
  }

  const token = await createSessionToken(username.trim());
  const response = NextResponse.redirect(new URL("/dashboard", req.url), 303);
  response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions());

  return response;
}
