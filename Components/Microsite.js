'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { toast } from 'sonner';

export default function Microsite() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/microsite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });

    if (response.ok) {
      const data = await response.json();
      toast.success('Microsite created successfully');
      console.log('Microsite created:', data);
    } else {
      console.error('Error creating microsite');
      toast.error('Error creating microsite');
    }
  };

  return (
    <div>
      <Card className="w-full max-w-2xl">
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
          <Button onClick={handleSubmit} type="submit">
            Create Microsite
          </Button>
        </div>
      </Card>
    </div>
  );
}
