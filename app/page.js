'use client';

import BuyDomain from '@/Components/CheckDomain';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function MainPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BuyDomain />
    </QueryClientProvider>
  );
}
