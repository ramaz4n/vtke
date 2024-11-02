'use client';

import {usePathname} from 'next/navigation';
import type {PropsWithChildren} from 'react';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import MainHeader from '@/components/main-header/main-header';

export function Layout({ children }:PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      {pathname === '/'? <MainHeader/> : <Header/>}
      {children}
      {pathname !== '/' && <Footer/>}
    </>
  );
}

