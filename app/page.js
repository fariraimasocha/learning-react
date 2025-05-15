'use client';

import Microsite from '@/Components/Microsite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function MainPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Microsite />
    </QueryClientProvider>
  );
}
