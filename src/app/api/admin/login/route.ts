import { NextResponse } from "next/server";
import {
  createSessionToken,
  getSessionCookieOptions,
  SESSION_COOKIE_NAME,
  verifyAdminCredentials
} from "@/lib/auth";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const username = String(formData.get("username") || "");
    const password = String(formData.get("password") || "");

    if (!username || !password) {
      return NextResponse.json({ error: "Usuario y contraseña requeridos" }, { status: 400 });
    }

    const isValid = await verifyAdminCredentials(username, password);
    if (!isValid) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const token = await createSessionToken(username.trim());
    const response = NextResponse.json({ success: true, redirect: "/dashboard" });
    response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions());
    return response;
  } catch (err) {
    console.error("Error en login:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
