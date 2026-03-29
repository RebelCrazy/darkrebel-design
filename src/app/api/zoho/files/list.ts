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
  if (!token?.access_token) {
    return NextResponse.json(
      { error: 'No Zoho access token available' }, 
      { status: 500 }
    );
  }

  try {
    // Force explicit type with 'as string | null'
    const data = await listZohoFolders(token.access_token, parentFolder as string | null);
    return NextResponse.json({ success: true, data });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: 'List failed', details: errorMessage }, 
      { status: 500 }
    );
  }
}