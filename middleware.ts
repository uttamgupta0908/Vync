import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value;
    const { pathname } = request.nextUrl;

    // List of protected routes that REQUIRE authentication
    const protectedRoutes = ['/messages', '/communities/join'];
    
    // Check if the route is protected
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtected && !accessToken) {
        // Redirect to home (or show login) if trying to access protected route without token
        const url = new URL('/', request.url);
        url.searchParams.set('auth_required', 'true');
        return NextResponse.redirect(url);
    }

    // Add a custom header to identify if the request is authenticated (useful for client hints)
    const response = NextResponse.next();
    if (accessToken) {
        response.headers.set('X-Is-Authenticated', 'true');
    }

    return response;
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
