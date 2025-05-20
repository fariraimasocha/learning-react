import { NextResponse } from 'next/server';

const username = 'pateltanaka-test';
const token = process.env.NAMEDOTCOM_API_KEY;

export async function POST(request) {
  const credentials = Buffer.from(`${username}:${token}`).toString('base64');

  const { domain, purchasePrice, years } = await request.json();

  try {
    // Keep domain as an object with domainName property
    const domainObject =
      typeof domain === 'object' ? domain : { domainName: domain };

    const response = await fetch('https://api.dev.name.com/v4/domains', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: domainObject, // Send as object: { domainName: "example.org" }
        purchasePrice,
        years,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to purchase domain' },
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
