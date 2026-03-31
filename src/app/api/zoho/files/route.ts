import { NextRequest, NextResponse } from 'next/server';
import { obtenerZohoTokenActual } from '@/lib/db';
import { uploadFileToZoho } from '@/lib/zoho';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  // Espera un FormData con el archivo y metadatos
  const formData = await req.formData();
  const file = formData.get('file');
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  // Puedes agregar más campos/metadatos aquí si lo necesitas

  // Obtener token Zoho
  const token = await obtenerZohoTokenActual();
  const accessToken =
    typeof token?.access_token === 'string' && token.access_token.trim().length > 0
      ? token.access_token
      : null;

  if (!accessToken) {
    return NextResponse.json({ error: 'No Zoho access token available' }, { status: 500 });
  }

  try {
    const result = await uploadFileToZoho(file, accessToken);
    return NextResponse.json({ success: true, result });
  } catch (e) {
    return NextResponse.json({ error: 'Upload failed', details: e }, { status: 500 });
  }
}
