import { PropsWithChildren } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';

import './globals.css';
import '../../public/styles/lib/nprogress/nprogress.css';

import { Layout } from '@/components/layout/layout';
import { Provider } from '@/components/provider/provider.tsx';

export const metadata: Metadata = {
  description: '«VTKE»',
  title: 'Vtke',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <Layout>{children}</Layout>
          <ReactQueryDevtools />
        </Provider>
      </body>
    </html>
  );
}
