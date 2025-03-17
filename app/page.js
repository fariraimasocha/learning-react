"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Fetch from "@/Components/Fetch";
// import Interview from "@/Components/Interview";

export default function MainPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Fetch />
      {/* <Interview /> */}
    </QueryClientProvider>
  );
}
