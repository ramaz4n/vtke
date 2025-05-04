import cc from 'classcat';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAVIGATIONS } from '@/shared/constants/navigations.ts';

export const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <nav className='fixed bottom-0 left-0 z-layout h-[50px] w-full bg-white shadow-2xl lg:hidden'>
      <ul className='flex h-full items-center justify-between gap-2'>
        {NAVIGATIONS.map((item) => (
          <li key={item.id}>
            <Link
              className='px-3.5 py-1 text-10 font-bold text-textColor duration-300 hover:text-secondaryBlue sm:text-[16px]'
              href={item.link}
            >
              <span
                className={cc([
                  {
                    'text-secondaryBlue': pathname.includes(item.link),
                  },
                ])}
              >
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
