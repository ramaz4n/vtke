import { CategoryItemProps } from '@/shared/types/api/categories.ts';

export const CategoryItem = ({ name, onClick }: CategoryItemProps) => (
  <div
    className='group flex w-full cursor-pointer items-center justify-between rounded-2xl bg-gray-100 px-4 py-2 text-white transition hover:bg-gray-200'
    onClick={onClick}
  >
    <span className='text-sm text-black first-letter:capitalize sm:text-xl'>
      {name}
    </span>

    {/*<IoIosArrowRoundForward*/}
    {/*  className='size-8 -translate-x-3 transition-all duration-300 group-hover:translate-x-0 sm:size-10'*/}
    {/*  color='black'*/}
    {/*/>*/}
  </div>
);
