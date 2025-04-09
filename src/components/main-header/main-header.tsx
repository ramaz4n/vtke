import { ShoppingCart } from '@gravity-ui/icons';
import { Text } from '@gravity-ui/uikit';
import Link from 'next/link';

import Logo from '@/components/logo/logo.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';
import { useCart } from '@/shared/hooks/use-cart.ts';

export default function MainHeader() {
  const cartApi = useCart();

  const cartItemsLength = cartApi.getLength();

  return (
    <header className='sticky top-0 z-layout bg-transparent'>
      <MainContainer>
        <div className='flex h-compact-menu-padding items-center justify-between'>
          <Logo white />
          <div className='flex items-center justify-center gap-8'>
            <Link
              className='text-xl text-white transition-all duration-300 hover:opacity-75'
              href='/products'
            >
              <Text as='p' className='sm:text-xl' variant='header-1'>
                МАГАЗИН
              </Text>
            </Link>

            <Link
              className='relative flex flex-col items-center gap-0.5 text-white transition-all duration-300 hover:opacity-75'
              href={LINKS.cart()}
            >
              <ShoppingCart className='size-6' />

              {!!cartItemsLength && (
                <Text
                  className='text-tiny absolute -right-1 -top-1.5 size-4 rounded-full bg-danger-contrast text-white flex-center'
                  variant='caption-2'
                >
                  {cartItemsLength}
                </Text>
              )}
            </Link>

            <Link href='/login' rel='stylesheet'></Link>
          </div>
        </div>
      </MainContainer>
    </header>
  );
}
