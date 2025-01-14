import {TextInput} from '@gravity-ui/uikit';
import cc from 'classcat';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa6';
import { FiShoppingCart } from 'react-icons/fi';

import MainContainer from '@/components/container/main-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='absolute left-1/2 top-0 z-10 m-auto  w-full -translate-x-1/2  bg-white shadow-header-shadow'>
      <MainContainer>
        <div className='flex h-compact-menu-padding items-center justify-between'>
          <div className='flex items-center gap-24'>
            <Link href={LINKS.home}>
              <span className='text-2xl text-blue-900'>VTKE</span>
            </Link>

            <nav>
              <ul className='flex items-center gap-5'>
                <li>
                  <Link
                    href={LINKS.about}
                    className={cc([
                      { 'text-hoverColor': pathname === '/about' },
                      'px-3.5 py-1 text-xl text-textColor hover:text-hoverColor',
                    ])}
                  >
                    Компания
                  </Link>
                </li>
                <li>
                  <Link
                    href={LINKS.products()}
                    className={cc([
                      { 'text-hoverColor': pathname === '/products' },
                      'px-3.5 py-1 text-xl text-textColor hover:text-hoverColor',
                    ])}
                  >
                    Продукты
                  </Link>
                </li>
                <li>
                  <Link
                    href={LINKS.services()}
                    className={cc([
                      { 'text-hoverColor': pathname === '/services' },
                      'px-3.5 py-1 text-xl text-textColor hover:text-hoverColor',
                    ])}
                  >
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link
                    href={LINKS.news()}
                    className={cc([
                      { 'text-hoverColor': pathname === '/news' },
                      'px-3.5 py-1 text-xl text-textColor hover:text-hoverColor',
                    ])}
                  >
                    Новости
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className='flex items-center justify-center gap-6'>
            <div className='relative'>
              <TextInput className='w-compact-menu-padding' pin='round-round' placeholder="Поиск" />
            </div>
            <div className='relative'>
              <Link
                className='group flex flex-col items-center justify-between'
                href='/cart'
              >
                <FiShoppingCart
                  className='cursor-pointer'
                  color='textColor'
                  size='1.5em'
                />
                <span className='group-hover:animate-Scale text-sm'>Корзина</span>
              </Link>
              <span className='absolute -right-1.5 -top-3 rounded-full bg-textColor p-1 text-[8px] text-white'>
                111
              </span>
            </div>
            <Link
              className='flex flex-col items-center justify-between'
              href='/user'
              rel='stylesheet'
            >
              <FaRegUser color='textColor' size='1.5em' />
              <span className='text-sm'>Войти</span>
            </Link>
          </div>
        </div>
      </MainContainer>
    </header>
  );
}
