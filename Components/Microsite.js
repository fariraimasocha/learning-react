'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Microsite() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = '56464774853';

  const handleSocialLinkChange = (platform, value) => {
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [platform]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedSocialLinks = Object.entries(socialLinks)
      .filter(([_, url]) => url.trim() !== '')
      .map(([platform, url]) => ({
        platform,
        url,
        displayName: platform.charAt(0).toUpperCase() + platform.slice(1),
      }));

    try {
      const response = await fetch('/api/microsite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          userId,
          socialLinks: formattedSocialLinks,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Microsite created successfully');
        console.log('Microsite created:', data);
        router.push(`/microsite/${userId}`);
      } else {
        console.error('Error creating microsite');
        toast.error('Error creating microsite');
      }
    } catch (error) {
      console.error('Error creating microsite:', error);
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Card className="w-[700] px-5 mt-5">
          <CardHeader>
            <CardTitle>Your Microsite</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter microsite name"
              />
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter microsite description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex flex-col gap-2">
              <Label className="text-sm text-gray-500">Your Social Links</Label>
              <Input
                id="facebook-link"
                value={socialLinks.facebook}
                onChange={(e) =>
                  handleSocialLinkChange('facebook', e.target.value)
                }
                placeholder="facebook"
              />
              <Input
                id="twitter-link"
                value={socialLinks.twitter}
                onChange={(e) =>
                  handleSocialLinkChange('twitter', e.target.value)
                }
                placeholder="twitter"
              />
            </div>
          </CardFooter>
          <Button
            className="mx-5"
            onClick={handleSubmit}
            type="submit"
            disabled={isSubmitting || !name || !description}
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </Button>
        </Card>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Microsite Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">
                {name || 'Your Site Name'}
              </h2>
              <p className="text-sm text-gray-500">
                {description || 'Your site description will appear here'}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Label className="text-sm text-gray-500 mb-2 block">
                Social Links:
              </Label>
              <div className="flex flex-col gap-2">
                {socialLinks.facebook && (
                  <div className="text-sm">
                    Facebook: {socialLinks.facebook}
                  </div>
                )}
                {socialLinks.twitter && (
                  <div className="text-sm">Twitter: {socialLinks.twitter}</div>
                )}
                {!socialLinks.facebook && !socialLinks.twitter && (
                  <div className="text-sm text-gray-400">
                    No social links added
                  </div>
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
