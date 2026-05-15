import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// ⚠️ Endpoint temporal para debug — eliminar en producción
export async function GET() {
  const globalEnv = (globalThis as any).__ENV__;
  const vars = {
    ADMIN_USERNAME: !!(globalEnv?.ADMIN_USERNAME || process.env.ADMIN_USERNAME),
    ADMIN_PASSWORD_HASH: !!(globalEnv?.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD_HASH),
    ADMIN_SESSION_SECRET: !!(globalEnv?.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET),
    DB_binding: !!(globalEnv?.DB || (globalThis as any).DB),
    source_globalThis_ENV: !!globalEnv,
    source_process_env: !!process.env.ADMIN_USERNAME,
  };

  return NextResponse.json(vars);
}
