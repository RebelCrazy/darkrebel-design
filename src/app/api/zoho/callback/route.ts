import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import { DB } from '@/lib/db';
import { guardarZohoTokens } from '@/lib/db';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  // Configura tus credenciales aquí
  const client_id = '1000.OONQK4REOQ6C4UKGCH6912DLS1MYWI';
  const client_secret = '4336496defead834211ee2bc9340851811bbc8a070';
  const redirect_uri = 'https://proyectos.darkrebel.store/api/zoho/callback';

  const params = new URLSearchParams({
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: 'authorization_code',
  });

  try {
    const tokenRes = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const data = await tokenRes.json();
    if (data.error) {
      return NextResponse.json({ error: data.error, details: data }, { status: 400 });
    }
    // Guardar tokens en la base de datos D1
    try {
      await guardarZohoTokens(data);
    } catch (err) {
      return NextResponse.json({ error: 'Token received but failed to save in DB', details: err, tokens: data }, { status: 500 });
    }
    return NextResponse.json({ success: true, tokens: data });
  } catch (e) {
    return NextResponse.json({ error: 'Request failed', details: e }, { status: 500 });
  }
}
