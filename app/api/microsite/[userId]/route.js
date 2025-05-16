import { NextResponse } from 'next/server';
import Microsite from '@/models/User';
import { connect } from '@/utils/connect';

export async function GET(request, { params }) {
  await connect();
  const { userId } = await params;

  try {
    const microsite = await Microsite.findOne({ userId });

    if (!microsite) {
      return NextResponse.json(
        { message: 'Microsite not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(microsite, { status: 200 });
  } catch (error) {
    console.error('Error fetching microsite:', error);
    return NextResponse.json(
      { message: 'Error fetching microsite' },
      { status: 500 }
    );
  }
}
