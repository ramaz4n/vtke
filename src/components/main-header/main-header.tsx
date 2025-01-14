import Link from 'next/link';
import {FaRegUser} from 'react-icons/fa6';
import {FiShoppingCart} from 'react-icons/fi';

import MainContainer from '@/components/container/main-container.tsx';

export default function MainHeader() {

  return (
    <div className="absolute left-1/2 top-0 z-10 m-auto h-compact-menu-padding w-full -translate-x-1/2  bg-transparent ">
      <MainContainer>
        <div className='flex items-center justify-between'>
          <Link href="/">
            <img alt="logo" className="size-24" src="/images/custom-logo.png"/>
          </Link>
          <div className="flex items-center justify-center gap-5">
            <Link className="text-xl text-white" href="/products">МАГАЗИН</Link>
            <div className="relative">
              <Link href="/cart">
                <FiShoppingCart className="cursor-pointer" color="white" size="1.5em"/>
              </Link>
              <span className="absolute -right-4 -top-6 rounded-full bg-gray-200 p-1 text-xs text-gray-500">111</span>
            </div>
            <Link href="/user" rel="stylesheet">
              <FaRegUser color="white" size="1.5em"/>
            </Link>
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
