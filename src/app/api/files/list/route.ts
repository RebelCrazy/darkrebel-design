import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// GET /api/files/list
export async function GET(req: NextRequest, env: any) {
  // Listar objetos en el bucket
  const list = [];
  for await (const obj of env.MY_BUCKET.list()) {
    list.push({
      name: obj.key,
      size: obj.size,
      isDirectory: false,
      path: obj.key,
      id: obj.key
    });
  }
  return NextResponse.json({ success: true, files: list });
}
