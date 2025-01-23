import { Text } from '@gravity-ui/uikit';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa6';
import { FiShoppingCart } from 'react-icons/fi';

import MainContainer from '@/containers/main-container/main-container.tsx';

export default function MainHeader() {
  return (
    <header className='sticky top-0 z-10 bg-transparent'>
      <MainContainer>
        <div className='flex h-compact-menu-padding items-center justify-between'>
          <Link href='/'>
            <img alt='logo' className='h-16' src='/images/logo-white.svg' />
          </Link>
          <div className='flex items-center justify-center gap-5'>
            <Link className='text-xl text-white' href='/products'>
              <Text>МАГАЗИН</Text>
            </Link>
            <div className='relative'>
              <Link href='/cart'>
                <FiShoppingCart
                  className='cursor-pointer'
                  color='white'
                  size='1.5em'
                />
              </Link>
              <Text className='absolute -right-4 -top-6 size-5 rounded-full bg-gray-200 p-1 text-xs text-gray-500 flex-center'>
                111
              </Text>
            </div>
            <Link href='/login' rel='stylesheet'>
              <FaRegUser color='white' size='1.5em' />
            </Link>
          </div>
        </div>
      </MainContainer>
    </header>
  );
}
