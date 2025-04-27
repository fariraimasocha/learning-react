'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Intermediate from "@/Components/Intermediate";
// import Interview from '@/Components/Interview';
// import Fetch from "@/Components/Fetch";
// import Scrimba from '@/Components/Scrimba';
import UseMemo from '@/Components/useMemo';

export default function MainPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Intermediate /> */}
      {/* <Fetch /> */}
      {/* <Interview /> */}
      {/* <Scrimba /> */}
      <UseMemo />
    </QueryClientProvider>
  );
}
