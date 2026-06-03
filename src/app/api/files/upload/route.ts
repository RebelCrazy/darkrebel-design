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

// POST /api/files/upload
export async function POST(req: NextRequest) {
  const bucket = getBucket();
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  // Guardar archivo en R2
  const arrayBuffer = await file.arrayBuffer();
  const objectName = file.name;
  await bucket.put(objectName, arrayBuffer, {
    httpMetadata: {
      contentType: file.type || 'application/octet-stream',
    },
  });
  return NextResponse.json({ success: true, message: 'Archivo guardado en R2', name: objectName });
}
