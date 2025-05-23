import { NextResponse } from 'next/server';

export async function POST(request) {
  const code = process.env.ZOHO_AUTH_CODE;
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const redirectUri = process.env.ZOHO_REDIRECT_URI;
  const scope = process.env.ZOHO_SCOPE;

  const url = `https://accounts.zoho.com/oauth/v2/token?code=${code}&grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&scope=${scope}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(
      'Error exchanging authorization code for access token:',
      error
    );
    return NextResponse.json(
      { error: 'Failed to exchange authorization code for access token' },
      { status: 500 }
    );
  }
}
