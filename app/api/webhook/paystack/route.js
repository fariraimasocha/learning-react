import { verifyTrasaction } from '@/utils/paystack';
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('Received Paystack webhook request', request);
  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
}
