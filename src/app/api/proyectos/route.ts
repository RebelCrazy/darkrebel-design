import { NextResponse } from "next/server";
import { crearProyecto } from "@/lib/db";
import { isTrustedOrigin, SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

export const runtime = "edge";

const ESTADOS = ["Planeación", "En Desarrollo", "Finalizado"] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidHttpsUrl(urlValue: string): boolean {
  try {
    const url = new URL(urlValue);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function getCookieValue(cookieHeader: string, cookieName: string): string | null {
  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [rawName, ...rawValue] = part.trim().split("=");
    if (rawName === cookieName) {
      return decodeURIComponent(rawValue.join("="));
    }
  }

  return null;
}

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  const cookieHeader = req.headers.get("cookie") || "";
  const token = getCookieValue(cookieHeader, SESSION_COOKIE_NAME);
  const session = token ? await verifySessionToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const contentType = req.headers.get("content-type") || "";

  let payload: Record<string, string> = {};

  if (contentType.includes("application/json")) {
    payload = (await req.json()) as Record<string, string>;
  } else {
    const formData = await req.formData();
    payload = Object.fromEntries(formData.entries()) as Record<string, string>;
  }

  const nombre = (payload.nombre || "").trim();
  const clienteEmail = (payload.cliente_email || "").trim();
  const progreso = Number(payload.progreso);
  const estado = (payload.estado || "").trim();
  const linkFigma = (payload.link_figma || "").trim();

  if (!nombre || !clienteEmail || !ESTADOS.includes(estado as (typeof ESTADOS)[number])) {
    return NextResponse.json({ error: "Datos invalidos" }, { status: 400 });
  }

  if (nombre.length > 140 || clienteEmail.length > 254 || !EMAIL_REGEX.test(clienteEmail)) {
    return NextResponse.json({ error: "Nombre o email invalidos" }, { status: 400 });
  }

  if (!Number.isFinite(progreso) || progreso < 0 || progreso > 100) {
    return NextResponse.json({ error: "Progreso fuera de rango" }, { status: 400 });
  }

  if (linkFigma && !isValidHttpsUrl(linkFigma)) {
    return NextResponse.json({ error: "El link de Figma debe ser una URL https valida" }, { status: 400 });
  }

  const id = await crearProyecto({
    nombre,
    cliente_email: clienteEmail,
    progreso,
    estado: estado as (typeof ESTADOS)[number],
    link_figma: linkFigma
  });

  const acceptsHtml = req.headers.get("accept")?.includes("text/html");
  if (acceptsHtml) {
    return NextResponse.redirect(new URL(`/proyecto/${id}`, req.url), 303);
  }

  return NextResponse.json({ ok: true, id }, { status: 201 });
}
