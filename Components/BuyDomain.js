'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { useQuery } from '@tanstack/react-query';

export default function BuyDomain() {
  const [domain, setDomain] = useState('');

  const BaseUrl = 'api.ote-godaddy.com';
  const CustomerId = '658344786';

  const fetchDomain = async () => {
    const response = await fetch(`${BaseUrl}/v1/domains/available`, {
      method: 'GET',
      headers: {
        Authorization: `sso-key ${CustomerId}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: domain,
        checkType: 'FAST',
        forTransfer: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  };

  const { data, isLoading } = useQuery{
    queryKey: ['domain', domain],
    queryFn: fetchDomain,
  };

  // Display loading state or data
  console.log('Domain data:', data);
  if (isLoading) console.log('Loading...');

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div>
          <h1>Step 2 Domain Purchase</h1>
        </div>
        <Card className="w-[700] px-5 mt-5">
          <Label htmlFor="email">Domain Aquistion</Label>
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain to buy"
          />
          <Button>Buy</Button>
        </Card>
      </div>
    </div>
  );
}
