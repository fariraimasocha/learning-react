import { NextResponse } from 'next/server';
import Payment from '@/models/Payment';

export async function POST(request) {
  const { userId, amount, status, reference } = await request.json();

  try {
    const payment = await Payment.create({
      userId,
      amount,
      status,
      reference,
    });
    return NextResponse.json(
      { message: 'Payment created successfully', payment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
