import { NextRequest, NextResponse } from "next/server";
import {
  crearPlantilla,
  actualizarPlantilla,
  eliminarPlantilla,
  obtenerPlantillas,
} from "@/lib/db";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const tipo = req.nextUrl.searchParams.get("tipo") || undefined;
    const rows = await obtenerPlantillas(tipo);
    return NextResponse.json(rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const id = await crearPlantilla({
      nombre: String(data.nombre ?? "").trim() || "Sin título",
      tipo: String(data.tipo ?? "otro").trim(),
      contenido: String(data.contenido ?? ""),
    });
    return NextResponse.json({ ok: true, id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    await actualizarPlantilla(String(data.id), {
      nombre: data.nombre,
      tipo: data.tipo,
      contenido: data.contenido,
    });
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await eliminarPlantilla(String(id));
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
