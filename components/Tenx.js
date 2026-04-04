'use client';

import Image from 'next/image';
import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
  CardContent,
} from './ui/card';
import { motion } from 'motion/react';

export default function Tenx() {
  return (
    <motion.div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <Image
          src="/images/p1.jpg"
          alt="McLaren 720S"
          width={400}
          height={267}
          className="w-full h-auto object-cover"
        />
        <CardHeader>
          <CardTitle>McLaren 720S</CardTitle>
          <CardDescription>Twin-turbo V8 supercar</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            A high-performance supercar delivering 710 horsepower with a sleek,
            aerodynamic design.
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Supercar Collection</p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
