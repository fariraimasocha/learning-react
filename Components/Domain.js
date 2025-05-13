import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';

export default function Domain() {
  const [domain, setDomain] = useState('');

  const BaseUrl = 'api.ote-godaddy.com';
  const CustomerId = '658344786';

  const SearchUrl = 'https://domains-api.p.rapidapi.com/domains/';

  const handleSearch = async () => {
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
    } catch (error) {
      console.error('Error:', error);
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
