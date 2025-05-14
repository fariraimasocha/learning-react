import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain parameter is required' },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(
      `https://api.ote-godaddy.com/v1/domains/available?domain=${domain}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_SECRET}`,
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GoDaddy API Error:', errorData);
      return NextResponse.json(
        { error: errorData.message || 'API request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      cause: error.cause,
      code: error.cause?.code,
    });

    return NextResponse.json(
      { error: 'Failed to check domain availability' },
      { status: 500 }
    );
  }
}
