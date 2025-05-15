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

  const CustomerId = '658344786';

  const payload = {
    consent: {
      agreedAt: '2025-05-14T12:00:00Z',
      agreedBy: '192.168.1.110',
      agreementKeys: ['DNRA'],
    },
    contactAdmin: {
      addressMailing: {
        address1: '9410 Unidale Drive',
        address2: 'Sunningdale',
        city: 'Harare',
        country: 'ZW',
        postalCode: '00263',
        state: 'HA',
      },
      nameFirst: 'Tendai',
      nameLast: 'Moyo',
      organization: 'ZimTech Solutions',
      email: 'tendai.moyo@zimtech.co.zw',
      phone: '+263.772123456',
      jobTitle: 'Administrator',
    },
    contactBilling: {
      addressMailing: {
        address1: '9410 Unidale Harare',
        address2: 'Sunningdale',
        city: 'Harare',
        country: 'ZW',
        postalCode: '00000',
        state: 'HA',
      },
      nameFirst: 'Farirai',
      nameLast: 'Masocha',
      organization: 'Daily Sale shop',
      email: 'fariraimasocha@gmail.com',
      phone: '+263.781840930',
      jobTitle: 'Software Developer',
    },
    contactRegistrant: {
      addressMailing: {
        address1: '9410 Unidale Drive',
        address2: 'Sunningdale',
        city: 'Harare',
        country: 'ZW',
        postalCode: '00263',
        state: 'HA',
      },
      nameFirst: 'Tendai',
      nameLast: 'Moyo',
      organization: 'ZimTech Solutions',
      email: 'tendai.moyo@zimtech.co.zw',
      phone: '+263.772123456',
      jobTitle: 'Administrator',
    },
    contactTech: {
      addressMailing: {
        address1: '9410 Unidale Drive',
        address2: 'Sunningdale',
        city: 'Harare',
        country: 'ZW',
        postalCode: '00263',
        state: 'HA',
      },
      nameFirst: 'Tendai',
      nameLast: 'Moyo',
      organization: 'ZimTech Solutions',
      email: 'tendai.moyo@zimtech.co.zw',
      phone: '+263.772123456',
      jobTitle: 'Administrator',
    },
    domain: 'meek1.one',
    nameServers: ['ns1.godaddy.com', 'ns2.godaddy.com'],
    period: 1,
    privacy: false,
    renewAuto: false,
  };

  const handleBuyDomain = async () => {
    try {
      const response = await fetch('/api/buy-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('The Response from GoDaddy', data);

      if (data?.data) {
        toast.success('Domain purchased successfully');
      } else {
        toast.error('Failed to purchase domain');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while purchasing the domain');
    }
  };

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
              value="example.dev"
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain name"
            />
            <Button onClick={handleBuyDomain}>Buy</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
