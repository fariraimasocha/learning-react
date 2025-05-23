import { NextResponse } from 'next/server';

export async function GET(request) {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const redirectUri = process.env.ZOHO_REDIRECT_URI;
  const scope = process.env.ZOHO_SCOPE;
  try {
    const zoho = `https://accounts.zoho.com/oauth/v2/auth?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline`;

    return NextResponse.json({ url: zoho }, { status: 200 });
  } catch (error) {
    console.error('Error generating Zoho authorization URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate authorization URL' },
      { status: 500 }
    );
  }
}
