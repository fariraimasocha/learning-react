'use client';

import BuyDomain from '@/Components/CheckDomain';

export default function MainPage() {
  const queryClient = new QueryClient();
  return (
    <>
      <BuyDomain />
    </>
  );
}
