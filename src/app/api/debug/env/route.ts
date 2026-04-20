import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const username = process.env.ADMIN_USERNAME || "NOT SET";
  const hashConfigured = !!process.env.ADMIN_PASSWORD_HASH;
  const secretConfigured = !!process.env.ADMIN_SESSION_SECRET;

  return NextResponse.json({
    username,
    passwordHashConfigured: hashConfigured,
    sessionSecretConfigured: secretConfigured,
    env: process.env.NODE_ENV,
    message: "Endpoint de debug - elimina después de resolver"
  });
}
