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

  const CustomerId = '658344786';

  const handleBuyDomain = async () => {};

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div>
          <div>
            <h1>Step 3 Domain Purchasing</h1>
          </div>
          <Card className="w-[700] px-5 mt-5">
            <Label htmlFor="email">Domain purchase</Label>
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain name"
            />
            <Button onClick={handleSearch}>Buy</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
