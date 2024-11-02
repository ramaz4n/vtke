import type { Metadata } from 'next';
import type {PropsWithChildren} from 'react';

import './globals.css';

import {Layout} from '@/components/layout/layout';

export const metadata: Metadata = {
  description: '«VTKE»',
  title: 'Vtke',
};

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
