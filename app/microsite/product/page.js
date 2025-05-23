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
import CircularSpinner from '@/Components/Loading';
import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Export the Product component directly - no need for the wrapper
export default function Product() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = '58450004853';
  const queryClient = useQueryClient();

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', userId],
    queryFn: async () => {
      const response = await fetch(`/api/product?userId=${userId}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Error fetching products');
      }

      return data.data;
    },
  });

  // Products from query data
  const products = productsData || [];

  // Create mutation for adding products
  const createProduct = useMutation({
    mutationFn: async (productData) => {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Error creating product');
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch products query after successful mutation
      queryClient.invalidateQueries({ queryKey: ['products', userId] });
      toast.success('Product uploaded successfully');

      // Reset form
      setName('');
      setDescription('');
      setImageUrl('');
      setPrice('');
    },
    onError: (error) => {
      console.error('Error uploading product:', error);
      toast.error(error.message || 'Error uploading product');
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

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

    // Use the mutation instead of fetch
    createProduct.mutate({
      name,
      description,
      imageUrl,
      price: parseFloat(price),
      userId,
    });
  };

  // Rest of your component remains the same
  return (
    <div className="flex justify-center items-center">
      <div>
        <Card className="w-[700] px-5 mt-5">
          {/* Card content remains the same */}
          <CardHeader>
            <CardTitle>Product Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form fields remain the same */}
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
                <div className="flex flex-col gap-2 items-center">
                  <div className="relative w-full h-48 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      src={imageUrl}
                      alt="Product image preview"
                      fill
                      priority
                      quality={80}
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setImageUrl('')}
                    type="button"
                  >
                    Replace Image
                  </Button>
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={handleUploadComplete}
                  onUploadError={(error) => {
                    toast.error('Error uploading image');
                  }}
                />
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Uploading...' : 'Upload Product'}
              </Button>
            </form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        {/* Display products or loading spinner */}
        {isLoading ? (
          <CircularSpinner size="small" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <Card
                key={product._id}
                className="overflow-hidden mt-5 mb-5 hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={product.imageUrl}
                    priority
                    alt={product.name}
                    fill
                    className="object-fill"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="">
                  <h3 className="text-lg font-bold truncate mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-green-700">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
