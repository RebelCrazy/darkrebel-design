import { NextRequest, NextResponse } from "next/server";
import { crearProyecto, actualizarProyecto, eliminarProyecto, obtenerProyectos } from "@/lib/db";

export const runtime = "edge";

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
