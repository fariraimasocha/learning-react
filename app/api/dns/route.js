import { NextResponse } from 'next/server';
import { connect } from '@/utils/connect';
import Dns from '@/models/Dns';

export async function POST(req) {
  const { domain, micrositeId, userId } = await req.json();

  try {
    await connect();
    const newDns = await Dns.create({
      domain,
      micrositeId,
      userId,
    });
    return NextResponse.json(
      { message: 'DNS created successfully', dns: newDns },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create DNS' },
      { status: 500 }
    );
  }
}
