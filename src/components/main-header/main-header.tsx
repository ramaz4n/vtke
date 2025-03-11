import { Text } from '@gravity-ui/uikit';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa6';
import { FiShoppingCart } from 'react-icons/fi';

import Logo from '@/components/logo/logo.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';

export default function MainHeader() {
  return (
    <header className='sticky top-0 z-10 bg-transparent'>
      <MainContainer>
        <div className='flex h-compact-menu-padding items-center justify-between'>
          <Logo white />
          <div className='flex items-center justify-center gap-5'>
            <Link className='text-xl text-white' href='/products'>
              <Text>
                <p className='sm:text-xl'>МАГАЗИН</p>
              </Text>
            </Link>
            <div className='relative'>
              <Link href='/cart'>
                <FiShoppingCart
                  className='cursor-pointer'
                  color='white'
                  size='1.7em'
                />
              </Link>
              <Text
                className='absolute -right-3 -top-4.5 size-5 rounded-full bg-gray-200 p-1 text-gray-500 flex-center'
                variant='caption-2'
              >
                111
              </Text>
            </div>
            <Link href='/login' rel='stylesheet'>
              <FaRegUser color='white' size='1.7em' />
            </Link>
          </div>
        </div>
      </MainContainer>
    </header>
  );
}
