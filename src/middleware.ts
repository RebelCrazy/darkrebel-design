import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'darkrebel_session';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Permitir acceso público a /login
  if (pathname.startsWith('/login')) {
    return NextResponse.next();
  }
  if (pathname.startsWith('/admin')) {
    const session = req.cookies.get(SESSION_COOKIE)?.value;
    if (!session) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.search = '';
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};