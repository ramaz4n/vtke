import { IoIosArrowRoundForward } from 'react-icons/io';

import { CategoryItemProps } from '@/shared/types/api/categories.ts';

export const CategoryItem = ({ name, onClick }: CategoryItemProps) => (
  <div
    className='group flex w-full cursor-pointer items-center justify-between rounded-2xl bg-gray-100 px-4 py-2 text-white transition hover:bg-gray-200'
    onClick={onClick}
  >
    <span className='text-sm text-black first-letter:capitalize sm:text-xl'>
      {name}
    </span>

    <IoIosArrowRoundForward
      className='mr-3 w-[30px] transition-all duration-300 group-hover:mr-0 sm:w-[40px]'
      color='black'
      size='lg'
    />
  </div>
);
