import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

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
          method: 'POST',
          headers: {
            'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
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
    <div>
      <h1>Domain Search</h1>
      <Input
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain name"
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
