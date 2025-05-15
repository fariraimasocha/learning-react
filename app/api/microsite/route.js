import { NextResponse } from 'next/server';
import Microsite from '@/models/User';
import { connect } from '@/utils/connect';

export async function POST(request) {
  await connect();
  const { name, description } = await request.json();

  try {
    Microsite.create({
      name,
      description,
    });
    return NextResponse.json(
      { message: 'Microsite created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating microsite:', error);
    return NextResponse.json(
      { message: 'Error creating microsite' },
      { status: 500 }
    );
  }
}
