import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// ⚠️ Endpoint temporal para debug — eliminar en producción
export async function GET() {
  const vars = {
    ADMIN_USERNAME: !!(globalThis as any).__ENV__?.ADMIN_USERNAME || !!process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD_HASH: !!(globalThis as any).__ENV__?.ADMIN_PASSWORD_HASH || !!process.env.ADMIN_PASSWORD_HASH,
    ADMIN_SESSION_SECRET: !!(globalThis as any).__ENV__?.ADMIN_SESSION_SECRET || !!process.env.ADMIN_SESSION_SECRET,
    DB_binding: !!(globalThis as any).__ENV__?.DB || !!(globalThis as any).DB,
    // Muestra de dónde vienen
    source_globalThis_ENV: !!(globalThis as any).__ENV__,
    source_process_env_ADMIN_USERNAME: !!process.env.ADMIN_USERNAME,
    runtime_info: typeof EdgeRuntime !== "undefined" ? "edge" : "node",
  };

  return NextResponse.json(vars);
}
