'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from './ui/card';

export default function MicrositeTemplate({ microsite }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="bg-primary text-white">
          <CardTitle className="text-2xl font-bold text-center">
            {microsite.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose max-w-none">
            <p className="text-lg">{microsite.description}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-gray-500">
          <div>Created by User {microsite.userId}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
