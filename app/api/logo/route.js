import { NextResponse } from 'next/server';
import Logo from '@/models/logo';
import { connect } from '@/utils/connect';

export async function GET(req) {
  await connect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    const logos = await Logo.find({ userId });

    return NextResponse.json(
      {
        success: true,
        data: logos,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching logos',
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await connect();
  const { userId, url } = await req.json();

  try {
    const logo = await Logo.create({
      userId,
      url,
    });

    return NextResponse.json(
      {
        success: true,
        data: logo,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error creating logo',
      },
      { status: 500 }
    );
  }
}
