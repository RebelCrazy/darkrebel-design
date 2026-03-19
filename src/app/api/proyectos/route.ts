import { NextRequest, NextResponse } from "next/server";
import { crearProyecto, actualizarProyecto, eliminarProyecto, obtenerProyectos } from "@/lib/db";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Generar UID único si no existe
    if (!data.uid) {
      data.uid = crypto.randomUUID();
    }
    const id = await crearProyecto(data);
    return NextResponse.json({ ok: true, id, uid: data.uid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    await actualizarProyecto(data.id, data);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await eliminarProyecto(id);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET() {
  try {
    const proyectos = await obtenerProyectos();
    return NextResponse.json(proyectos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const runtime = "edge";

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
