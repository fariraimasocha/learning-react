'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function BuyDomain() {
  const [domain, setDomain] = useState('');
  const router = useRouter();
  const [model, setModel] = useState('mistral-saba-24b');
  const [userSetMessage, setUserSetMessage] = useState(
    'look at the domain and give me 3 domain suggestions'
  );

  const CustomerId = '658344786';

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/check-domain?domain=${domain}&checkType=full&forTransfer=false`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();
      console.log('The Response from GoDaddy', data);

      if (data?.data?.available === true) {
        toast.success('Domain is available');
        router.push('/microsite');
        toast('Redirecting to Website Builder');
      }
      if (data?.data?.available === false) {
        toast.error('Domain is not available');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDomainSuggestion = async () => {
    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          userSetMessage,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
        toast.error('Error fetching domain suggestions');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error fetching domain suggestions');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div>
          <h1>Step 2 Domain Searching</h1>
        </div>
        <Card className="w-[700] px-5 mt-5">
          <Label htmlFor="email">Domain Search</Label>
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain name"
          />
          <Button onClick={handleSearch}>Search</Button>
        </Card>
      </div>
    </div>
  );
}
