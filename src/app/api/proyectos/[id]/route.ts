import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { obtenerProyectoPorId, actualizarProyecto, eliminarProyecto } from "@/lib/db";
import { verifySessionToken, SESSION_COOKIE_NAME, isTrustedOrigin } from "@/lib/auth";

export const runtime = "edge";
export const dynamic = "force-dynamic";

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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const proyecto = await obtenerProyectoPorId(id);
    if (!proyecto) {
      return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
    }
    return NextResponse.json(proyecto);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isTrustedOrigin(req)) {
      return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
    }
    const cookieHeader = req.headers.get("cookie") || "";
    const token = getCookieValue(cookieHeader, SESSION_COOKIE_NAME);
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { id } = await params;
    const data = await req.json();
    await actualizarProyecto(id, data);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isTrustedOrigin(req)) {
      return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
    }
    const cookieHeader = req.headers.get("cookie") || "";
    const token = getCookieValue(cookieHeader, SESSION_COOKIE_NAME);
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { id } = await params;
    await eliminarProyecto(id);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
