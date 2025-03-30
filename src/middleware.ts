import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const url = request.nextUrl; //url that user is requesting for

    // console.log("Token:", token);

    if (token) {
        if (
            url.pathname.startsWith('/login') ||
            url.pathname.startsWith('/signup')
        ) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } else if (!token) {
        if (url.pathname.startsWith('/dashboard')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next(); // Continue as normal
}

// Apply middleware only to these routes
export const config = {
    matcher: ['/dashboard/:path*', '/login', '/signup'],
};