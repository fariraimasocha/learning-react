import { NextResponse } from 'next/server';
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  token: process.env.VERCEL_TOKEN,
});
