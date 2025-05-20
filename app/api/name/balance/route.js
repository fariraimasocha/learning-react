import { NextResponse } from 'next/server';

const username = 'pateltanaka-test';
const token = process.env.NAMEDOTCOM_API_KEY;

export async function GET(request) {
  const credentials = Buffer.from(`${username}:${token}`).toString('base64');

  try {
    const response = await fetch(
      'https://api.dev.name.com/v4/accountinfo/balance',
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
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
