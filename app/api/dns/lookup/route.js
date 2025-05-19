import { NextResponse } from 'next/server';
import { connect } from '@/utils/connect';
import Dns from '@/models/Dns';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json(
      { error: 'Domain parameter is required' },
      { status: 400 }
    );
  }

  try {
    await connect();
    const dnsRecord = await Dns.findOne({ domain });

    if (!dnsRecord) {
      return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
    }

    return NextResponse.json(dnsRecord, { status: 200 });
  } catch (error) {
    console.error('Error looking up domain:', error);
    return NextResponse.json(
      { error: 'Failed to lookup domain' },
      { status: 500 }
    );
  }
}
