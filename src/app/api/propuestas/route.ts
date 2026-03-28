import { NextRequest, NextResponse } from "next/server";
import {
  obtenerPropuestas,
  crearPropuesta,
  actualizarPropuesta,
  eliminarPropuesta,
} from "@/lib/db";

export const runtime = "edge";

export async function GET() {
  try {
    const rows = await obtenerPropuestas();
    return NextResponse.json(rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const id = await crearPropuesta({
      proyecto_id: data.proyecto_id || null,
      titulo: String(data.titulo ?? "Propuesta"),
      moneda: data.moneda,
      total: data.total != null ? Number(data.total) : undefined,
      estado: data.estado,
      items_json: typeof data.items_json === "string" ? data.items_json : JSON.stringify(data.items_json ?? []),
      notas: data.notas,
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
    await actualizarPropuesta(String(data.id), {
      proyecto_id: data.proyecto_id,
      titulo: data.titulo,
      moneda: data.moneda,
      total: data.total,
      estado: data.estado,
      items_json: typeof data.items_json === "string" ? data.items_json : JSON.stringify(data.items_json ?? []),
      notas: data.notas,
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
    await eliminarPropuesta(String(id));
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
