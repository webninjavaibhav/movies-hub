import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
  console.log("we are here")
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // If user is logged in and tries to access login/register, redirect to home
  if (pathname === '/sign-in') {
    if (token) {
      return NextResponse.redirect(new URL('/movie-list', request.url));
    }
    return NextResponse.next();
  }

  // For protected paths, redirect to login if no token
  if (!token) {
    const response = NextResponse.redirect(new URL('/sign-in', request.url));
    // Clear the cookie if it exists but is invalid
    response.cookies.delete('token');
    return response;
  } else {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/movie-list', request.url));
    }
    return NextResponse.next();
  }

}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};