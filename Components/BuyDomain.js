'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Card } from './ui/card';

export default function BuyDomain() {
  const [domain, setDomain] = useState('');

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
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
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
