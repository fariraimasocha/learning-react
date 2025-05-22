'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import React from 'react';
import { UploadDropzone } from '@/utils/uploadthing';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { toast } from 'sonner';

export default function Product() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = '58450004853';

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

    if (!name || !description || !price) {
      toast.error('Please fill all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          imageUrl,
          price,
          userId,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Product uploaded successfully');
        setName('');
        setDescription('');
        setImageUrl('');
        setPrice('');
      } else {
        toast.error('Error uploading product');
      }
    } catch (error) {
      console.error('Error uploading product:', error);
      toast.error('Error uploading product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center  h-screen">
      <Card className="w-[700px] px-5 mt-5">
        <CardHeader>
          <CardTitle>Product Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            {imageUrl ? (
              <></>
            ) : (
              <>
                {' '}
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={handleUploadComplete}
                  onUploadError={(error) => {
                    toast.error('Error uploading image');
                  }}
                />
              </>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Uploading...' : 'Upload Product'}
            </Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
