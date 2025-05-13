'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';

export default function BuyDomain() {
  const [domain, setDomain] = useState('');

  const BaseUrl = 'api.ote-godaddy.com';
  const CustomerId = '658344786';

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div>
          <h1>Step 2 Domain Purchase</h1>
        </div>
        <Card className="w-[700] px-5 mt-5">
          <Label htmlFor="email">Domain Aquistion</Label>
          <Input placeholder="Enter domain to buy" />
          <Button>Search</Button>
        </Card>
      </div>
    </div>
  );
}
