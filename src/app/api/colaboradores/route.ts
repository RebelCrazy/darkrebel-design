import { NextRequest, NextResponse } from "next/server";
import {
  obtenerColaboradores,
  crearColaborador,
  actualizarColaborador,
  eliminarColaborador,
} from "@/lib/db";

export const runtime = "edge";

export async function GET() {
  try {
    const rows = await obtenerColaboradores();
    return NextResponse.json(rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const nombre = String(data.nombre ?? "").trim();
    const email = String(data.email ?? "").trim();
    if (!nombre || !email) {
      return NextResponse.json({ error: "Nombre y email requeridos" }, { status: 400 });
    }
    const id = await crearColaborador({ nombre, email });
    return NextResponse.json({ ok: true, id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    await actualizarColaborador(String(data.id), {
      nombre: String(data.nombre),
      email: String(data.email),
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
    await eliminarColaborador(String(id));
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
