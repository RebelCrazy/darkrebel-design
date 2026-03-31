import { NextRequest, NextResponse } from 'next/server';
import { obtenerZohoTokenActual } from '@/lib/db';
import { listZohoFolders } from '@/lib/zoho';

export const runtime = 'edge';

// GET /api/zoho/files/list?parent_id=xxxx
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const parent_id = url.searchParams.get('parent_id');
  
  // Convertir a string | null de forma explícita
  let parentFolder: string | null = null;
  
  if (typeof parent_id === 'string' && parent_id.trim().length > 0) {
    parentFolder = parent_id.trim();
  }

  const token = await obtenerZohoTokenActual();
  const accessToken =
    typeof token?.access_token === 'string' && token.access_token.trim().length > 0
      ? token.access_token
      : null;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'No Zoho access token available' }, 
      { status: 500 }
    );
  }

  try {
    const data = await listZohoFolders(accessToken, parentFolder);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: 'List failed', details: errorMessage }, 
      { status: 500 }
    );
  }
}
