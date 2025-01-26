import { useState } from 'react';

import { Modal, Text } from '@gravity-ui/uikit';
import cc from 'classcat';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa6';
import { FiShoppingCart } from 'react-icons/fi';
import { IoMdSearch } from 'react-icons/io';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';

export default function Header() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();

  const onSearchOpen = () => {
    setSearchModalOpen(true);
  };

  return (
    <header className='sticky top-0 z-10 bg-white shadow-header-shadow'>
      <MainContainer>
        <div className='flex h-compact-menu-padding items-center justify-between'>
          <div className='flex items-center gap-24'>
            <Link href={LINKS.home}>
              <img alt='logo' className='h-16' src='/images/logo.svg' />
            </Link>

            <nav>
              <ul className='flex items-center gap-5'>
                <li>
                  <Link
                    href={LINKS.about}
                    className={cc([
                      { 'text-blueColor': pathname === '/about' },
                      'hover:text-blueColor px-3.5 py-1 text-textColor',
                    ])}
                  >
                    <Text variant='header-1'>Компания</Text>
                  </Link>
                </li>
                <li>
                  <Link href={LINKS.products()}>
                    <Text
                      variant='header-1'
                      className={cc([
                        { 'text-blueColor': pathname === '/products' },
                        'hover:text-blueColor px-3.5 py-1 text-textColor',
                      ])}
                    >
                      Продукты
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link
                    href={LINKS.services()}
                    className={cc([
                      { 'text-blueColor': pathname === '/services' },
                      'hover:text-blueColor px-3.5 py-1 text-xl text-textColor',
                    ])}
                  >
                    <Text variant='header-1'>Услуги</Text>
                  </Link>
                </li>
                <li>
                  <Link
                    href={LINKS.news()}
                    className={cc([
                      { 'text-blueColor': pathname === '/news' },
                      'hover:text-blueColor px-3.5 py-1 text-xl text-textColor',
                    ])}
                  >
                    <Text variant='header-1'>Новости</Text>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className='flex items-center justify-center gap-6'>
            <div className='relative cursor-pointer p-1' onClick={onSearchOpen}>
              <IoMdSearch color='textColor' size={32} />
            </div>
            <div className='relative'>
              <Link
                className='group flex flex-col items-center justify-between'
                href='/cart'
              >
                <FiShoppingCart
                  className='cursor-pointer'
                  color='textColor'
                  size='1.7em'
                />
                <Text className='group-hover:animate-Scale' variant='body-1'>
                  Корзина
                </Text>
              </Link>
              <Text
                className='absolute -right-1.5 -top-3 size-5 rounded-full bg-textColor text-white flex-center'
                variant='caption-2'
              >
                111
              </Text>
            </div>
            <Link
              className='flex flex-col items-center justify-between'
              href='/login'
              rel='stylesheet'
            >
              <FaRegUser color='textColor' size='1.7em' />
              <Text className='text-sm' variant='body-1'>
                Войти
              </Text>
            </Link>
          </div>
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
