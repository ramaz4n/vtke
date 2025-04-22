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
import { useGlobalSearch } from '@/shared/hooks/api/use-global-search.ts';
import { useCart } from '@/shared/hooks/use-cart.ts';
import { useModal } from '@/shared/hooks/use-modal.ts';
import { Modal } from '@/shared/ui/modal/modal.tsx';
import { Spinner } from '@/shared/ui/spinner/spinner.tsx';

export default function Header() {
  const pathname = usePathname();

  const headerRef = useRef<HTMLHeadElement>(null);
  const lastScrollY = useRef(0);

  const cartApi = useCart();
  const globalSearchApi = useGlobalSearch();
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
          className='g-modal-align__start g-modal-without-header g-modal-tiny-container'
          name='global-search'
          size='xl'
        >
          <section className='flex flex-col gap-4'>
            <div className='flex items-center gap-2 overflow-hidden rounded-lg bg-zinc-100 px-2.5 transition-all duration-300 hover:bg-zinc-50'>
              {globalSearchApi.searchMutation.isPending ? (
                <Spinner size={20} />
              ) : (
                <Icon className='text-secondary' data={Magnifier} size={20} />
              )}

              <input
                ref={globalSearchApi.inputRef}
                autoFocus
                className='peer h-10 w-full cursor-pointer bg-transparent focus:cursor-text focus:outline-none'
                maxLength={128}
                placeholder='Что искать?'
                onChange={(event) =>
                  globalSearchApi.onSearch(event.target.value, event)
                }
              />

              <Button
                className='transition-all duration-300 peer-placeholder-shown:invisible peer-placeholder-shown:opacity-0'
                type='button'
                onClick={globalSearchApi.clearInputValue}
              >
                <Icon className='text-secondary' data={Xmark} />
              </Button>
            </div>

            <section>
              <div className='inline-flex items-end gap-4'>
                <Text variant='subheader-2'>История</Text>

                {!!globalSearchApi.storage.length && (
                  <button
                    className='font-semibold text-primary transition-all duration-300 hover:opacity-75'
                    type='button'
                    onClick={globalSearchApi.clearHistory}
                  >
                    Очистить
                  </button>
                )}
              </div>

              {globalSearchApi.storage.length ? (
                <div className='mt-4 flex flex-col gap-1.5'>
                  {globalSearchApi.storage.map((item) => (
                    <div
                      key={item.id.toString()}
                      className='group flex cursor-pointer items-center justify-between gap-2 rounded-xl p-1 transition-all duration-300 hover:bg-zinc-50'
                      onClick={() => globalSearchApi.onSearch(item.query)}
                    >
                      <div className='flex items-center gap-2'>
                        <span className='size-8 rounded-lg bg-zinc-100 flex-center'>
                          <Icon
                            className='text-secondary'
                            data={ClockArrowRotateLeft}
                            size={18}
                          />
                        </span>

                        <span className='truncate font-medium'>
                          {item.query}
                        </span>
                      </div>

                      <Button
                        className='mr-1 transition-all duration-300 group-hover:visible group-hover:opacity-100 xl:invisible xl:opacity-0'
                        size='s'
                        type='button'
                        view='flat'
                        onClick={(event) => {
                          event.stopPropagation();
                          globalSearchApi.deleteHistoryItem(item.id);
                        }}
                      >
                        <Icon data={Xmark} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='mt-4 pb-2 flex-center'>
                  <span className='text-xs font-semibold text-secondary'>
                    История пуста
                  </span>
                </div>
              )}
            </section>
          </section>
        </Modal>
      </MainContainer>
    </header>
  );
}
