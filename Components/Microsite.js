'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Card } from './ui/card';

export default function Microsite() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div>
      <Card className="w-full max-w-2xl">
        <div className="grid gap-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter microsite name" />
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter microsite description"
          />
          <Button type="submit">Create Microsite</Button>
        </div>
      </Card>
    </div>
  );
}
