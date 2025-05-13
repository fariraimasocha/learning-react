'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Domain from '@/Components/Domain';

export default function MainPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Domain />
    </QueryClientProvider>
  );
}
