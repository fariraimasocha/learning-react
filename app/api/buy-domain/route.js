import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(
      'https://api.ote-godaddy.com/v1/domains/purchase/validate',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Shopper-Id': '658344786',
          Authorization: `sso-key ${process.env.GODADDY_API_KEY}:${process.env.GODADDY_SECRET}`,
        },
        body: JSON.stringify({
          consent: body.consent,
          contactAdmin: body.contactAdmin,
          contactBilling: body.contactBilling,
          contactRegistrant: body.contactRegistrant,
          contactTech: body.contactTech,
          domain: body.domain,
          nameServers: body.nameServers,
          period: body.period,
          privacy: body.privacy,
          renewAuto: body.renewAuto,
        }),
      }
    );

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to purchase domain' },
      { status: 500 }
    );
  }
}
