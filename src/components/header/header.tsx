'use client';
import { useRef, useState } from 'react';

import { Magnifier, Person, ShoppingCart } from '@gravity-ui/icons';
import { Modal, Text } from '@gravity-ui/uikit';
import cc from 'classcat';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEventListener } from 'usehooks-ts';

import Logo from '@/components/logo/logo.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';
import { NAVIGATIONS } from '@/shared/constants/navigations.ts';
import { useCart } from '@/shared/hooks/use-cart.ts';

export default function Header() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();

  const headerRef = useRef<HTMLHeadElement>(null);
  const lastScrollY = useRef(0);

  const cartApi = useCart();

  const cartItemsLength = cartApi.getLength();

  const onSearchOpen = () => {
    setSearchModalOpen(true);
  };

  function onScroll() {
    const currentScrollY = window.scrollY;

    if (!headerRef.current) return;

    if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
      headerRef.current.classList.add('-translate-y-full');
    } else {
      headerRef.current.classList.remove('-translate-y-full');
      // Показать хедер при скролле вверх
    }

    lastScrollY.current = currentScrollY;
  }

  useEventListener('scroll', onScroll);

  return (
    <header
      ref={headerRef}
      className='z-layout sticky top-0 bg-white shadow-header-shadow transition-transform duration-300'
    >
      <MainContainer>
        <div className='flex h-compact-menu-padding items-center justify-between'>
          <div className='flex items-center gap-20'>
            <Logo />

            <nav>
              <ul className='hidden items-center gap-2 lg:flex'>
                {NAVIGATIONS.map((item) => (
                  <li key={item.id}>
                    <Link
                      className='px-3.5 py-1 text-textColor duration-300 hover:text-secondaryBlue'
                      href={item.link}
                    >
                      <Text
                        variant='header-1'
                        className={cc([
                          {
                            'text-secondaryBlue': pathname.includes(item.link),
                          },
                        ])}
                      >
                        {item.title}
                      </Text>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className='flex items-center justify-center gap-6'>
            <button
              className='flex flex-col items-center gap-0.5'
              onClick={onSearchOpen}
            >
              <Magnifier className='size-7' />

              <Text
                className='text-secondary transition-all duration-300 hover:text-foreground'
                variant='body-1'
              >
                Поиск
              </Text>
            </button>

            <Link
              className='relative flex flex-col items-center gap-0.5'
              href={LINKS.cart()}
            >
              <ShoppingCart className='size-7' />

              <Text
                className='text-secondary transition-all duration-300 hover:text-foreground'
                variant='body-1'
              >
                Корзина
              </Text>

              {!!cartItemsLength && (
                <Text
                  className='text-tiny bg-danger-contrast absolute -top-1.5 right-2.5 size-4 rounded-full text-white flex-center'
                  variant='caption-2'
                >
                  {cartItemsLength}
                </Text>
              )}
            </Link>

            <Link
              className='flex flex-col items-center gap-0.5'
              href='/login'
              rel='stylesheet'
            >
              <Person className='size-7' />

              <Text
                className='text-secondary transition-all duration-300 hover:text-foreground'
                variant='body-1'
              >
                Войти
              </Text>
            </Link>
          </div>

          <div className='absolute bottom-[20px] right-[20px] flex size-10 items-center justify-center rounded-[50%] bg-mainBlue sm:size-16 lg:hidden'></div>
        </div>
        <Modal
          open={searchModalOpen}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClose={() => setSearchModalOpen(false)}
        >
          <div className='top-20 flex min-h-compact-menu-padding w-full min-w-3.5 max-w-screen-xl items-center justify-center rounded-2xl bg-white pos-abs-x'>
            content
          </div>
        </Modal>
      </MainContainer>
    </header>
  );
}
