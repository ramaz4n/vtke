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
          <div className='z-total fixed bottom-[20px] right-[20px] flex size-14 items-center justify-center rounded-[50%] bg-mainBlue sm:size-16 lg:hidden'>
            {/*<GiHamburgerMenu*/}
            {/*  className='z-total size-8 sm:size-8'*/}
            {/*  color='white'*/}
            {/*  onClick={() => showMobileMenu('mobile-menu')}*/}
            {/*/>*/}
          </div>
          <MobileMenu />
        </main>
      )}

      {pathname !== '/' && <Footer />}
    </div>
  );
}
