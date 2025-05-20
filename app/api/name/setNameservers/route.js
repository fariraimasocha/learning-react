import { NextResponse } from 'next/server';

const username = 'pateltanaka-test';
const token = process.env.NAMEDOTCOM_API_KEY;

export async function GET(request) {
  const credentials = Buffer.from(`${username}:${token}`).toString('base64');
}
