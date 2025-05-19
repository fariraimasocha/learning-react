// 1. First, let's update your middleware.js
// File: middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Get the hostname (e.g. fariraimasocha.co.zw, demo.example.com)
  const hostname = request.headers.get('host');

  // Exclude Next.js static assets and API routes
  const path = request.nextUrl.pathname;
  if (
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.includes('.') ||
    hostname === 'localhost:3000' ||
    hostname.includes('vercel.app')
  ) {
    return NextResponse.next();
  }

  try {
    // Call our API endpoint rather than connecting to the database directly
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      `https://${request.headers.get('x-forwarded-host') || request.headers.get('host')}`;

    const response = await fetch(
      `${baseUrl}/api/dns/lookup?domain=${hostname}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const dns = await response.json();
      if (dns && dns.micrositeId) {
        const url = request.nextUrl.clone();
        url.pathname = `/microsite/${dns.micrositeId}${path === '/' ? '' : path}`;
        return NextResponse.rewrite(url);
      }
    }
  } catch (error) {
    console.error('Error in middleware:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
