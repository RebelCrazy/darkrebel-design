import { NextRequest, NextResponse } from "next/server";
import { crearCliente, actualizarCliente, eliminarCliente, obtenerClientesConProyectos } from "@/lib/db";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const id = await crearCliente(data);
    return NextResponse.json({ ok: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    await actualizarCliente(data.id, data);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await eliminarCliente(id);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export const runtime = "edge";

export async function GET() {
  try {
    const data = await obtenerClientesConProyectos();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
