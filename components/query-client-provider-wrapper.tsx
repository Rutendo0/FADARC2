"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

// This is a simple default query client. You might have a more complex one in lib/queryClient.ts
// Please provide the content of lib/queryClient.ts if it's different.
const defaultQueryClient = new QueryClient()

export function QueryClientProviderWrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => defaultQueryClient)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
