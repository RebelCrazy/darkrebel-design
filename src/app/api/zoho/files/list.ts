import { NextRequest, NextResponse } from 'next/server';
import { obtenerZohoTokenActual } from '@/lib/db';
import { listZohoFolders } from '@/lib/zoho';

export const runtime = 'edge';

// GET /api/zoho/files/list?parent_id=xxxx
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
    let parent_id: string | null = url.searchParams.get('parent_id') ?? null;
    if (typeof parent_id !== 'string' || !parent_id) {
      parent_id = null;
    }
    // Fix robusto: forzar tipo antes de llamar a listZohoFolders
    if (typeof parent_id !== 'string' && parent_id !== null) {
      parent_id = null;
    }
  const token = await obtenerZohoTokenActual();
  if (!token?.access_token) {
    return NextResponse.json({ error: 'No Zoho access token available' }, { status: 500 });
  }
  try {
      const data = await listZohoFolders(token.access_token, parent_id ?? null);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json({ error: 'List failed', details: e }, { status: 500 });
  }
}
