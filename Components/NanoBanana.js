'use client';
import React from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Button } from './ui/button';

export default function NanoBanana() {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/nanobanana');
      return response.data;
    },
  });
  if (mutation.isLoading) {
    return <div>Loading...</div>;
  }
  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }
  if (mutation.isSuccess) {
    return (
      <div>
        <h1>Nano Banana Dish</h1>
        <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Button onClick={() => mutation.mutate()}>
        Generate Nano Banana Dish
      </Button>
    </div>
  );
}
