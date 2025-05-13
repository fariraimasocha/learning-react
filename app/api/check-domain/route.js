import { NextResponse } from 'next/server';

export async function GET(req) {
  const body = await req.json();

  const { domain, checkType, forTransfer } = body;

  try {
    const response = await fetch(
      `https://api.ote-godaddy.com/v1/domains/available?domain=${domain}&checkType=${checkType}&forTransfer=${forTransfer}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_API_SECRET}`,
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
