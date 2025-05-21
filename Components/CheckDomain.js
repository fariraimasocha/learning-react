'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import CircularSpinner from './Loading';

import { useRouter } from 'next/navigation';
import { set } from 'mongoose';

export default function BuyDomain() {
  const [domain, setDomain] = useState('');
  const router = useRouter();
  const [model, setModel] = useState('mistral-saba-24b');
  const [userSetMessage, setUserSetMessage] = useState(
    'look at the domain and give me 7 domain suggestions'
  );
  const [domainSuggestions, setDomainSuggestions] = useState([]);
  const [hasSuggestions, setHasSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const CustomerId = '658344786';

  const handleSearch = async () => {
    setIsLoading(true);
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
        handleDomainSuggestion(domain);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDomainSuggestion = async () => {
    setIsLoading(true);
    const messageWithDomain = `${userSetMessage} for "${domain}"`;

    try {
      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          userMessage: messageWithDomain,
        }),
      });

      const data = await response.json();
      console.log('The Response from Groq', data);

      if (!response.ok) {
        console.error('Error fetching domain suggestions', data);
        toast.error('Error fetching domain suggestions');
      }

      if (response.ok) {
        toast.success('Domain suggestions fetched successfully');

        const content = data.content;
        const domainRegex = /\*\*(.*?)\*\*/g;
        const matches = [...content.matchAll(domainRegex)];
        const extractedDomains = matches.map((match) => match[1].trim());

        setDomainSuggestions(extractedDomains);
        setHasSuggestions(true);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error fetching domain suggestions', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <CircularSpinner size="medium" color="text-sidenav" />
      ) : (
        <>
          {' '}
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

                {hasSuggestions &&
                  (isLoading ? (
                    <CircularSpinner size="small" color="text-sideenav" />
                  ) : (
                    <>
                      {' '}
                      <div className="mt-5">
                        <h2 className="mb-3">Domain Suggestions</h2>
                        <div className="flex flex-wrap gap-2">
                          {domainSuggestions.map((domainName, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                              onClick={() => setDomain(domainName)}
                            >
                              {domainName}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  ))}
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
}
