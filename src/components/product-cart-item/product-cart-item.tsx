import { Minus, Plus } from '@gravity-ui/icons';
import { Checkbox, Icon, Label, Text } from '@gravity-ui/uikit';
import Image from 'next/image';

import { ProductProps } from '@/shared/types/api/products.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Trash } from '@/shared/ui/icons/trash.tsx';
import { getFormatSum } from '@/shared/utils/get-format-sum.ts';

export interface ProductCartItemProps extends ProductProps {
  count: number;
}

export const ProductCartItem = ({
  price,
  images,
  name,
  firm,
  categories,
  count = 0,
}: ProductCartItemProps) => (
  <div>
    <div className='grid grid-cols-[1fr_60%_1fr_1fr] gap-6'>
      <div className='relative aspect-[96/128] w-full max-w-24 overflow-hidden rounded-xl ring-1 ring-white'>
        <div className='absolute left-0 top-0 z-10 size-6 rounded-md bg-white flex-center before:absolute before:-right-2 before:top-0 before:size-2 before:rounded-tl-lg before:shadow-[-3.5px_-3.5px_0_2px_#fff] after:absolute after:-bottom-2 after:left-0 after:size-2 after:rounded-tl-lg after:shadow-[-3.5px_-3.5px_0_2px_#fff]'>
          <Checkbox />
        </div>

        <Image
          fill
          alt={images[0].name}
          objectFit='cover'
          src={images[0].path}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <span className='line-clamp-2 text-base font-medium'>{name}</span>

        <Text>{firm || 'OTIS'}</Text>

        <div className='flex flex-wrap items-center gap-2.5'>
          {categories?.map((category) => (
            <Label
              key={category.id}
              className='pin-circle truncate'
              theme='unknown'
            >
              {category.name}
            </Label>
          ))}
        </div>

        <div className='mt-auto flex items-center gap-4'>
          <Button size='l' view='flat'>
            <Trash className='text-secondary' />
          </Button>
        </div>
      </div>

      <div>
        <div className='flex items-center gap-4'>
          <Button disabled={count <= 1} size='l' view='normal'>
            <Icon data={Minus} />
          </Button>

          <Text className='min-w-10 text-center' variant='subheader-2'>
            {count}
          </Text>

          <Button disabled={count >= 20} size='l' view='normal'>
            <Icon data={Plus} />
          </Button>
        </div>
      </div>

      <div className='flex flex-col items-end py-1.5'>
        <Text color='secondary' variant='subheader-3'>
          {getFormatSum(count * Number.parseInt(price))}
        </Text>

        <Text className='text-xs font-semibold' color='danger'>
          (с НДС)
        </Text>
      </div>
    </div>
  </div>
);
