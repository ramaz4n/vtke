'use client';

import { PropsWithChildren } from 'react';

import { configure, Lang } from '@gravity-ui/uikit';
import { usePathname } from 'next/navigation';

// import { GiHamburgerMenu } from 'react-icons/gi';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import MainHeader from '@/components/main-header/main-header';
import { MobileMenu } from '@/components/mobile-menu/mobile-menu.tsx';

configure({ lang: Lang.Ru });

export function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  // const showMobileMenu = useUnit(showModalEvent);

  return (
    <div className='flex h-full flex-col'>
      {pathname === '/' ? <MainHeader /> : <Header />}
      {pathname === '/' ? (
        children
      ) : (
        <main className='flex flex-1'>
          {children}
          <MobileMenu />
        </main>
      )}

      {pathname !== '/' && <Footer />}
    </div>
  );
}
