import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// POST /api/files/upload
export async function POST(req: NextRequest, env: any) {
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  // Guardar archivo en R2
  const arrayBuffer = await file.arrayBuffer();
  const objectName = file.name;
  await env.MY_BUCKET.put(objectName, arrayBuffer);
  return NextResponse.json({ success: true, message: 'Archivo guardado en R2', name: objectName });
}
