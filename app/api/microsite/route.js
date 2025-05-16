import { NextResponse } from 'next/server';
import Microsite from '@/models/User';
import { connect } from '@/utils/connect';

export async function POST(request) {
  await connect();
  const { userId, name, description, socialLinks } = await request.json();

  try {
    const newMicrosite = await Microsite.create({
      userId,
      name,
      description,
      socialLinks: socialLinks || [],
    });
    return NextResponse.json(
      { message: 'Microsite created successfully', microsite: newMicrosite },
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
