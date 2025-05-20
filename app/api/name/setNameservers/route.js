import { NextResponse } from 'next/server';

const username = 'pateltanaka-test';
const token = process.env.NAMEDOTCOM_API_KEY;

export async function GET(request) {
  const credentials = Buffer.from(`${username}:${token}`).toString('base64');

  const { domain, nameservers } = await request.json();
  try {
    const response = await fetch(
      `https://api.dev.name.com/v4/domains/${domain}/nameservers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nameservers }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to set nameservers' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
