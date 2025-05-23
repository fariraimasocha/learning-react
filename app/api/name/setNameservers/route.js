import { NextResponse } from 'next/server';

const username = 'pateltanaka-test';
const token = process.env.NAMEDOTCOM_API_KEY;

export async function POST(request) {
  const credentials = Buffer.from(`${username}:${token}`).toString('base64');

  try {
    const { domain, nameservers } = await request.json();

    // Validate input
    if (!domain || !nameservers || !Array.isArray(nameservers)) {
      return NextResponse.json(
        { error: 'Invalid request: domain and nameservers array required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.dev.name.com/v4/domains/${domain}:setNameservers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ nameservers }),
      }
    );

    // Log the actual response for debugging
    const responseText = await response.text();
    console.log('API Response:', response.status, responseText);

    let data;
    try {
      // Try to parse as JSON if possible
      data = JSON.parse(responseText);
    } catch (e) {
      // If not JSON, use the text response
      data = { message: responseText };
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'Failed to set nameservers',
          details: data,
          status: response.status,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data', message: error.message },
      { status: 500 }
    );
  }
}
