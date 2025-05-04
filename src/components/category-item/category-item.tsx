import { LayoutSplitSideContentLeft } from '@gravity-ui/icons';

import { CategoryItemProps } from '@/shared/types/api/categories.ts';

export const CategoryItem = ({ name, onClick }: CategoryItemProps) => (
  <div
    className='group flex w-full cursor-pointer items-center justify-end gap-3 rounded-2xl bg-gray-100 px-4 py-2 text-white transition hover:bg-gray-200'
    onClick={onClick}
  >
    <span className='text-right text-sm text-black first-letter:capitalize sm:text-xl'>
      {name}
    </span>

    <LayoutSplitSideContentLeft className='size-5 text-mainBlue' />
  </div>
);
