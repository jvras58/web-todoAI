"use client";

import React, { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 0, 
          gcTime: 3 * 60 * 60 * 1000,
          refetchOnWindowFocus: true,
          refetchOnMount: true,
          refetchOnReconnect: true,
        },
      },
    });
  });

  const [persister] = useState(() => {
    return createSyncStoragePersister({
      storage:
        typeof window !== "undefined" ? window.localStorage : undefined,
    });
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
    </PersistQueryClientProvider>
  );
}