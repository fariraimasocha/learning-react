'use client';

import React, { use, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Domain() {
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const SearchUrl = 'https://domains-api.p.rapidapi.com/domains/';

  const handleSearch = async () => {
    setIsLoading(true);
    toast('Searching for domain');

    try {
      const response = await fetch(
        `${SearchUrl}${domain}/whois?follow=1&raw=false`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'domains-api.p.rapidapi.com',
            'x-rapidapi-key':
              '9b96a5333bmsh12979cb913068bep18c711jsn337182f0fc14',
            Host: 'domains-api.p.rapidapi.com',
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (
        data['whois.nic.one'] &&
        data['whois.nic.one']['Domain Status'].length > 0
      ) {
        toast.success('Domain is available');
        toast('Redirecting to buy domain');
        router.push('/domain/buy');
      } else {
        router.push('/domain/buy');
        toast.error('redirecting to buy domain');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div>
          <h1>Step 1 Domain Search</h1>
        </div>
        <Card className="w-[700] px-5 mt-5">
          <Label htmlFor="email">Domain Search</Label>
          <Input
            value="meek1.one"
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain name"
          />
          <Button onClick={handleSearch}>Search</Button>
        </Card>
      </div>
    </div>
  );
}
