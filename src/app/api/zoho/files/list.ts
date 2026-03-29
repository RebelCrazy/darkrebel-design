import { NextRequest, NextResponse } from 'next/server';
import { obtenerZohoTokenActual } from '@/lib/db';
import { listZohoFolders } from '@/lib/zoho';

export const runtime = 'edge';

// GET /api/zoho/files/list?parent_id=xxxx
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const parent_id = url.searchParams.get('parent_id');
  
  // Validar: debe ser string no-vacío o null
  const parentFolder: string | null = typeof parent_id === 'string' && parent_id.trim() 
    ? parent_id.trim() 
    : null;

  const token = await obtenerZohoTokenActual();
  if (!token?.access_token) {
    return NextResponse.json(
      { error: 'No Zoho access token available' }, 
      { status: 500 }
    );
  }

  try {
    const data = await listZohoFolders(token.access_token, parentFolder);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    return NextResponse.json(
      { error: 'List failed', details: String(e) }, 
      { status: 500 }
    );
  }
}