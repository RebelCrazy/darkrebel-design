import { NextRequest, NextResponse } from 'next/server';
import type { R2Bucket } from '@cloudflare/workers-types';

export const runtime = 'edge';

function getBucket(): R2Bucket {
  const globalEnv = (globalThis as any).__ENV__;
  if (globalEnv?.MY_BUCKET) return globalEnv.MY_BUCKET as R2Bucket;
  const direct = (globalThis as any).MY_BUCKET;
  if (direct) return direct as R2Bucket;
  throw new Error(
    "No se encontró el binding R2 (MY_BUCKET). " +
    "Configúralo en Cloudflare Pages → Settings → Functions → R2 bucket bindings " +
    "con Variable name: MY_BUCKET"
  );
}

// GET /api/files/download?name=archivo.txt
export async function GET(req: NextRequest) {
  const bucket = getBucket();
  const url = new URL(req.url);
  const name = url.searchParams.get('name');
  if (!name) {
    return NextResponse.json({ error: 'No file name provided' }, { status: 400 });
  }
  const object = await bucket.get(name);
  if (!object) {
    return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
  }
  if (!object.body) {
    return NextResponse.json({ error: 'No file body available' }, { status: 500 });
  }
  const headers = new Headers();
  headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
  headers.set('Content-Disposition', `attachment; filename="${name}"`);
  return new Response(object.body as any, { headers });
}
