import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// GET /api/files/download?name=archivo.txt
export async function GET(req: NextRequest, env: any) {
  const url = new URL(req.url);
  const name = url.searchParams.get('name');
  if (!name) {
    return NextResponse.json({ error: 'No file name provided' }, { status: 400 });
  }
  const object = await env.MY_BUCKET.get(name);
  if (!object) {
    return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
  }
  const headers = new Headers();
  headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
  headers.set('Content-Disposition', `attachment; filename="${name}"`);
  return new Response(object.body, { headers });
}
