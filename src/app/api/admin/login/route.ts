import { NextResponse } from "next/server";
import {
  createSessionToken,
  getSessionCookieOptions,
  isTrustedOrigin,
  SESSION_COOKIE_NAME,
  verifyAdminCredentials
} from "@/lib/auth";

export const runtime = "edge";

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  const formData = await req.formData();
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  const isValid = await verifyAdminCredentials(username, password);
  if (!isValid) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const token = await createSessionToken(username.trim());
  const response = NextResponse.json({ success: true, redirect: "/dashboard" });
  response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions());
  return response;
}
