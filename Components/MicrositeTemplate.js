'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from './ui/card';
import { Label } from './ui/label';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { siFacebook, siX } from 'simple-icons';

export default function MicrositeTemplate({ microsite }) {
  const [logoUrl, setLogoUrl] = useState('');
  const [isLogoLoading, setIsLogoLoading] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      setIsLogoLoading(true);
      try {
        const response = await fetch(`/api/logo?userId=${microsite.userId}`);
        const data = await response.json();
        if (data.success && data.data && data.data.length > 0) {
          setLogoUrl(data.data[0].url);
          console.log('Logo URL:', data.data[0].url);
        } else {
          console.log('No logos found for this user');
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      } finally {
        setIsLogoLoading(false);
      }
    };

    if (microsite && microsite.userId) {
      fetchLogo();
    }
  }, [microsite]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="mt-4 w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle>Your Microsite</CardTitle>
          {logoUrl && (
            <Image src={logoUrl} alt="Logo" width={100} priority height={100} />
          )}
        </CardHeader>
        <CardContent>
          {microsite.imageUrl ? (
            <div className="mb-4 w-full relative rounded-md overflow-hidden h-48">
              <Image
                src={microsite.imageUrl}
                alt={`${microsite.name} image`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="mb-4 w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{microsite.name}</h2>
            <p className="text-sm text-gray-500">{microsite.description}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <div className="w-full mb-4">
            <Label className="text-sm text-gray-500 mb-2 block">
              Social Links:
            </Label>
            <div className="flex flex-row gap-2">
              {microsite.socialLinks && microsite.socialLinks.length > 0 ? (
                microsite.socialLinks.map((social) => (
                  <div key={social._id} className="flex items-center gap-2">
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      title={social.displayName}
                    >
                      {social.displayName.toLowerCase().includes('facebook') ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-blue-600"
                        >
                          <path d={siFacebook.path} />
                        </svg>
                      ) : social.displayName.toLowerCase().includes('x') ||
                        social.displayName.toLowerCase().includes('twitter') ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-gray-800"
                        >
                          <path d={siX.path} />
                        </svg>
                      ) : null}
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400">
                  No social links added
                </div>
              )}
            </div>
          </div>
          <Label className="text-sm text-gray-500">
            Created by User {microsite.userId}
          </Label>
        </CardFooter>
      </Card>
    </div>
  );
}
