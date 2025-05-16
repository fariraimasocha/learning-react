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

export default function MicrositeTemplate({ microsite }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="mt-4 w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle>Microsite Preview</CardTitle>
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
            <div className="flex flex-col gap-2">
              {microsite.socialLinks && microsite.socialLinks.length > 0 ? (
                microsite.socialLinks.map((social) => (
                  <div key={social._id} className="flex items-center gap-2">
                    <span className="font-medium">{social.displayName}:</span>
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {social.url}
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
