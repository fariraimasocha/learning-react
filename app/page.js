"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Intermediate from "@/Components/Intermediate";

// import Interview from "@/Components/Interview";
// import Fetch from "@/Components/Fetch";

export default function MainPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Intermediate />
      {/* <Fetch /> */}
      {/* <Interview /> */}
    </QueryClientProvider>
  );
}
