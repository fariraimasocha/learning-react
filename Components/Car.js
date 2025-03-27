import React from 'react';
import { Button } from './ui/button';

export default function Car({ color, model }) {
  const far = 10;
  return (
    <div className="p-4 bg-gray-100">
      {far <= 10 ? (
        <p>Fatso</p>
      ) : (
        <div>
          <h1>Car</h1>
          <p>Color: {color}</p>
          <p>Model: {model}</p>
          <Button
            variant="outline"
            onClick={() => {
              alert('Hello');
            }}
          >
            Click me
          </Button>
        </div>
      )}
    </div>
  );
}
