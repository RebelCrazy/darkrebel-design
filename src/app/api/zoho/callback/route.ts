import { NextRequest, NextResponse } from 'next/server';
import { guardarZohoTokens } from '@/lib/db';

export const runtime = 'edge';

function getEnv(name: string): string {
  const fromProcess = (typeof process !== 'undefined' && (process.env as any)[name]) || '';
  if (fromProcess) return fromProcess;

  const fromGlobal = (globalThis as any).__ENV__?.[name] || '';
  if (fromGlobal) return fromGlobal;

  const fromGlobalDirect = (globalThis as any)[name] || '';
  return fromGlobalDirect;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const client_id = getEnv('ZOHO_CLIENT_ID');
  const client_secret = getEnv('ZOHO_CLIENT_SECRET');
  const redirect_uri = getEnv('ZOHO_REDIRECT_URI') || 'https://proyectos.darkrebel.store/api/zoho/callback';

  if (!client_id || !client_secret) {
    return NextResponse.json(
      { error: 'Zoho credentials not configured in environment variables' },
      { status: 500 }
    );
  }

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
