import React from 'react';
import { notFound } from 'next/navigation';
import MicrositeTemplate from '@/Components/MicrositeTemplate';

async function getMicrosite(userId) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/microsite/${userId}`;

    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching microsite:', error);
    return null;
  }
}

export default async function UserMicrosite({ params }) {
  const { userId } = await params;

  const microsite = await getMicrosite(userId);

  if (!microsite) {
    notFound();
  }

  return <MicrositeTemplate microsite={microsite} />;
}
