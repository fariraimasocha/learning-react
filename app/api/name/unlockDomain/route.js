import { NextResponse } from 'next/server';

const username = 'pateltanaka-test';
const token = process.env.NAMEDOTCOM_API_KEY;

export async function POST(request) {
  const credentials = Buffer.from(`${username}:${token}`).toString('base64');

  // Get domain from request body
  const { domain } = await request.json();

  // Validate input
  if (!domain) {
    return NextResponse.json(
      { error: 'Invalid request: domain is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.dev.name.com/v4/domains/${domain}:unlock`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        // No body needed for unlock operation based on the curl example
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
          error: 'Failed to unlock domain',
          details: data,
          status: response.status,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      data || { success: true, message: 'Domain unlocked successfully' }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to unlock domain', message: error.message },
      { status: 500 }
    );
  }
}
