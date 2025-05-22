'use client';

import React, { useEffect, useState } from 'react';
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
import { UploadDropzone } from '@/utils/uploadthing';
import Image from 'next/image';
import CircularSpinner from './Loading';

export default function Microsite() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
  });

  const [isLogoLoading, setIsLogoLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = '96450004853';

  useEffect(() => {
    const fetchLogo = async () => {
      setIsLogoLoading(true);
      try {
        const response = await fetch(`/api/logo?userId=${userId}`);
        const data = await response.json();
        if (data.success && data.data && data.data.length > 0) {
          setLogoUrl(data.data[0].url);
          console.log('Logo URL:', data.data[0].url);
          toast.success('Logo fetched successfully');
        } else {
          console.log('No logos found for this user');
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
        toast.error('Error fetching logo');
      } finally {
        setIsLogoLoading(false);
      }
    };
    fetchLogo();
  }, [userId]);

  const handleSocialLinkChange = (platform, value) => {
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [platform]: value,
    }));
  };

  const handleUploadComplete = (res) => {
    console.log('Files: ', res);
    if (res && res.length > 0) {
      setImageUrl(res[0].ufsUrl);
      toast.success('Image uploaded successfully');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!imageUrl) {
      toast.error('Please upload an image first');
      setIsSubmitting(false);
      return;
    }

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
          imageUrl,
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

  return isLogoLoading ? (
    <>
      <CircularSpinner size="medium" color="text-sidenav" />
    </>
  ) : (
    <>
      <div className="flex justify-center items-center">
        <div>
          <Card className="w-[700] px-5 mt-5">
            <CardHeader>
              <CardTitle>Your Microsite</CardTitle>
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt="Logo"
                  width={100}
                  priority
                  height={100}
                />
              )}
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="mb-4">
                  <Label htmlFor="image" className="mb-2 block">
                    Site Image
                  </Label>
                  {!imageUrl ? (
                    <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={handleUploadComplete}
                      onUploadError={(error) => {
                        toast.error(`Upload error: ${error.message}`);
                      }}
                    />
                  ) : (
                    <div className="flex flex-col gap-2 items-center">
                      <div className="relative w-full h-48 overflow-hidden rounded-md">
                        <Image
                          src={imageUrl}
                          alt="Site image"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setImageUrl('')}
                      >
                        Replace Image
                      </Button>
                    </div>
                  )}
                </div>

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
                <Label className="text-sm text-gray-500">
                  Your Social Links
                </Label>
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
              className="mx-5 mb-5"
              onClick={handleSubmit}
              type="submit"
              disabled={isSubmitting || !name || !description || !imageUrl}
            >
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </Button>
          </Card>
          <Card className="mt-4 mb-4">
            <CardHeader>
              <CardTitle>Microsite Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {imageUrl && (
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
                    <Image
                      src={imageUrl}
                      alt="Site image preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
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
                    <div className="text-sm">
                      Twitter: {socialLinks.twitter}
                    </div>
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
    </>
  );
}
