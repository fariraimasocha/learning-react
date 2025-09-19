'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import axios from 'axios';
import { toast } from 'sonner';

export default function Crud() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const loadingToast = toast.loading('Creating entry...');

    try {
      const response = await axios.post('/api/crud', {
        title: title,
        description: description,
      });

      const data = await response.data;
      console.log(data);
      if (response.status === 201) {
        toast.success('Entry created successfully!');
        setTitle('');
        setDescription('');
      } else {
        toast.error('Failed to create entry.');
      }
    } catch (error) {
      toast.error('An error occurred while creating the entry.');
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-xl font-bold">Create Entry</h1>
        <Card className="w-xl px-5">
          <Input
            placeholder="Title"
            className="mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Description"
            className="mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handleSubmit}>Create</Button>
        </Card>
      </div>
    </div>
  );
}
