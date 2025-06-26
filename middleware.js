import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL

async function validateTokenWithAPI(token) {
  try {

    const response = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        Cookie: `access_token=${token}`,
      }
    });

    console.log(response.data);

    return { valid: true };

  } catch (error) {
    console.error('Token validation failed:', error);
    return { valid: false };
  }
}

export async function middleware(request) {

  const token = request.cookies.get('access_token')?.value;
  const isAuthPage = ['/sign-in', '/sign-up'].includes(request.nextUrl.pathname);

  // Ha nincs token és nem auth oldalon van
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Ha van token és auth oldalon van, átirányítás a főoldalra
  if (token && isAuthPage) {

    const { valid } = await validateTokenWithAPI(token);

    if (!valid) {
      const response = NextResponse.redirect(new URL('/sign-in', request.url));
      response.cookies.set('access_token', '', { maxAge: 0 }) // töröljük a rossz tokent
      return response
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};