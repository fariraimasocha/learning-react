import { NextResponse } from 'next/server';
import { connect } from '@/utils/connect';
import Dns from '@/models/Dns';

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
    await connect();
    const dns = await Dns.findOne({ domain: hostname });

    if (dns) {
      const url = request.nextUrl.clone();
      url.pathname = `/microsite/${dns.userId}`;
      return NextResponse.rewrite(url);
    }
  } catch (error) {
    console.error('Error in middleware:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
