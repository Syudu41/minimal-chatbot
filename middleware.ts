import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE = 'site_auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let the auth page and its own API through without checking
  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  const sitePassword = process.env.NEXT_PUBLIC_SITE_PASSWORD;

  // If no password is configured (e.g. during local dev), allow through
  if (!sitePassword) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(AUTH_COOKIE)?.value;

  if (authCookie !== sitePassword) {
    const loginUrl = new URL('/auth', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Protect all routes except Next.js internals and static assets
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?)$).*)',
  ],
};
