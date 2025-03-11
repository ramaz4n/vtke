import { useEffect, useState } from 'react';

import { Modal, Text } from '@gravity-ui/uikit';
import cc from 'classcat';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa6';
import { FiShoppingCart } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdSearch } from 'react-icons/io';

import Logo from '@/components/logo/logo.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { NAVIGATIONS } from '@/shared/constants/navigations.ts';
import { cn } from '@/shared/utils/cn.ts';

export default function Header() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();

  const onSearchOpen = () => {
    setSearchModalOpen(true);
  };

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Скрыть хедер при скролле вниз
      } else {
        setIsVisible(true); // Показать хедер при скролле вверх
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        'sticky top-0 z-10 bg-white shadow-header-shadow transition-transform duration-300',
        { '-translate-y-full': !isVisible },
      )}
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
                      className='hover:text-secondaryBlue px-3.5 py-1 text-textColor duration-300'
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

          <div className='bg-mainBlue absolute bottom-[20px] right-[20px] flex size-10 items-center justify-center rounded-[50%] sm:size-16 lg:hidden'>
            <GiHamburgerMenu className='sm:size-8' color='white' />
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
