'use client';
import { useRef } from 'react';

import {
  ClockArrowRotateLeft,
  Magnifier,
  Person,
  ShoppingCart,
  Xmark,
} from '@gravity-ui/icons';
import { Button, Icon, Text } from '@gravity-ui/uikit';
import cc from 'classcat';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEventListener } from 'usehooks-ts';

import Logo from '@/components/logo/logo.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';
import { NAVIGATIONS } from '@/shared/constants/navigations.ts';
import { useCart } from '@/shared/hooks/use-cart.ts';
import { useModal } from '@/shared/hooks/use-modal.ts';
import { Modal } from '@/shared/ui/modal/modal.tsx';

export default function Header() {
  const pathname = usePathname();

  const headerRef = useRef<HTMLHeadElement>(null);
  const lastScrollY = useRef(0);

  const cartApi = useCart();
  const modal = useModal();

  const cartItemsLength = cartApi.getLength();

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
      className='sticky top-0 z-layout bg-white shadow-header-shadow transition-transform duration-300'
    >
      <MainContainer>
        <div className='flex items-center justify-between max-lg:py-2.5 lg:h-compact-menu-padding'>
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

          <div className='flex items-center justify-center gap-6 max-lg:hidden'>
            <button
              className='flex flex-col items-center gap-0.5'
              onClick={() => modal.show('global-search')}
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
                  className='text-tiny absolute -top-1.5 right-2.5 size-4 rounded-full bg-danger-contrast text-white flex-center'
                  variant='caption-2'
                >
                  {cartItemsLength}
                </Text>
              )}
            </Link>

            <Link
              className='flex flex-col items-center gap-0.5'
              href={LINKS.login}
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

          <div className='flex size-9 items-center justify-center rounded-full bg-mainBlue lg:hidden'></div>
        </div>

        <Modal
          className='g-modal-align__start g-modal-without-header'
          name='global-search'
          size='xl'
        >
          <form className='flex flex-col gap-4'>
            <div className='flex items-center gap-2 overflow-hidden rounded-lg bg-zinc-100 px-2.5 transition-all duration-300 hover:bg-zinc-50'>
              <Icon className='text-secondary' data={Magnifier} size={20} />

              <input
                autoFocus
                className='h-10 w-full cursor-pointer bg-transparent focus:cursor-text focus:outline-none'
                maxLength={128}
                placeholder='Что искать?'
              />

              <Button type='button'>
                <Icon className='text-secondary' data={Xmark} />
              </Button>
            </div>

            <section>
              <div className='inline-flex items-end gap-4'>
                <Text variant='subheader-2'>История</Text>

                <button
                  className='font-semibold text-primary transition-all duration-300 hover:opacity-75'
                  type='button'
                >
                  Очистить
                </button>
              </div>

              <div className='mt-4 flex flex-col gap-1.5'>
                <div className='flex items-center gap-2'>
                  <div>
                    <span className='size-8 rounded-md bg-zinc-100 flex-center'>
                    <Icon
                        className='text-secondary'
                        data={ClockArrowRotateLeft}
                        size={18}
                    />
                  </span>

                    <span className='truncate font-medium'>Катушка топлива</span>
                  </div>

                  <Button>
                    <Icon
                  </Button>
                </div>

                <div className='flex items-center gap-2'>
                  <span className='size-8 rounded-md bg-zinc-100 flex-center'>
                    <Icon
                      className='text-secondary'
                      data={ClockArrowRotateLeft}
                      size={18}
                    />
                  </span>

                  <span className='truncate font-medium'>
                    Шестерня переключения
                  </span>
                </div>
              </div>
            </section>
          </form>
        </Modal>
      </MainContainer>
    </header>
  );
}
