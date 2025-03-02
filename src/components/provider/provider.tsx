'use client';

import { PropsWithChildren, ReactNode, useEffect } from 'react';

import { ThemeProvider } from '@gravity-ui/uikit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

import { Fallback } from '@/components/fallback/fallback.tsx';
import { useApp } from '@/shared/hooks/use-app.ts';

NProgress.configure({ showSpinner: false });

export function Provider({ children }: PropsWithChildren) {
  const { isAppReady, theme } = useApp();
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!isAppReady) {
    return <Fallback />;
  }

  return (
    <ThemeProvider theme={theme}>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function QueryProvider({
  children,
}: PropsWithChildren): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
