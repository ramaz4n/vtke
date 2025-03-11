'use client';

import { PropsWithChildren } from 'react';

import { usePathname } from 'next/navigation';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import MainHeader from '@/components/main-header/main-header';

export function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className='flex h-full flex-col'>
      {pathname === '/' ? <MainHeader /> : <Header />}
      {pathname === '/' ? (
        children
      ) : (
        <main className='flex flex-1'>{children}</main>
      )}

      {pathname !== '/' && <Footer />}
    </div>
  );
}
