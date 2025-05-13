import { NextResponse } from 'next/server';

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const domain = searchParams.get('domain');
  const checkType = searchParams.get('checkType');
  const forTransfer = searchParams.get('forTransfer');

  try {
    const response = await fetch(
      `https://api.ote-godaddy.com/v1/domains/available?domain=${domain}&checkType=${checkType}&forTransfer=${forTransfer}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_SECRET}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
