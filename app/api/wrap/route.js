import { UnipileClient } from 'unipile-node-sdk';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = new UnipileClient(
    'https://api23.unipile.com:15365',
    process.env.UNIPILE
  );
  try {
    const user = await client.users.getProfile({
      account_id: 'NZQ-20QOQUaWcikMsnuTNg',
      identifier: 'fariraimasocha',
    });
    return NextResponse.json({
      message: 'Successfully fetched user data',
      user,
    });
  } catch (error) {
    console.error('Error detail:', error);
    console.error('Error body:', error.body);
    console.error('Error message:', error.message);
    return NextResponse.json(
      {
        message: 'Error fetching accounts',
        error: error.message,
        details: error.body,
      },
      { status: 500 }
    );
  }
}
