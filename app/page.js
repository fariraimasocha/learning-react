'use client';

import BuyDomain from '@/Components/BuyDomain';
import Test from '@/Components/Test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Intermediate from "@/Components/Intermediate";
// import Interview from '@/Components/Interview';
// import Fetch from "@/Components/Fetch";
// import Scrimba from '@/Components/Scrimba';
// import UseMemo from '@/Components/useMemo';
// import Domain from '@/Components/Domain';

export default function MainPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BuyDomain />
      {/* <Intermediate /> */}
      {/* <Fetch /> */}
      {/* <Interview /> */}
      {/* <Scrimba /> */}
      {/* <UseMemo /> */}
      {/* <Test /> */}
      {/* <Domain /> */}
    </QueryClientProvider>
  );
}
