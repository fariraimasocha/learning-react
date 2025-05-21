import { NextResponse } from 'next/server';
import Logo from '@/models/logo';
import { connect } from '@/utils/connect';

export default async function POST(req) {
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
