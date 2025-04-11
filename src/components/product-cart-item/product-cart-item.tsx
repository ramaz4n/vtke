import { Minus, Plus } from '@gravity-ui/icons';
import { Checkbox, Icon, Label, Text } from '@gravity-ui/uikit';
import Image from 'next/image';
import Link from 'next/link';

import { LINKS } from '@/shared/constants/links.ts';
import { useCart } from '@/shared/hooks/use-cart.ts';
import { ProductProps } from '@/shared/types/api/products.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Trash } from '@/shared/ui/icons/trash.tsx';
import { getFormatSum } from '@/shared/utils/get-format-sum.ts';

export interface ProductCartItemProps extends ProductProps {
  count: number;
}

export const ProductCartItem = (props: ProductCartItemProps) => {
  const { price, images, name, firm, id, categories, count = 0 } = props;

  const cartApi = useCart();

  const isSelected = !!cartApi.selectedCartItems?.find(
    ({ item }) => item.id === id,
  )?.isActive;

  const onRemove = () => cartApi.removeItem(id);

  return (
    <div>
      <div className='flex gap-6 max-md:flex-col'>
        <div className='flex gap-6 md:grow'>
          <div className='relative aspect-[96/128] w-full min-w-24 max-w-24 overflow-hidden rounded-xl ring-1 ring-white'>
            <div className='absolute left-0 top-0 z-10 size-6 rounded-md bg-white flex-center before:absolute before:-right-2 before:top-0 before:size-2 before:rounded-tl-lg before:shadow-[-3.5px_-3.5px_0_2px_#fff] after:absolute after:-bottom-2 after:left-0 after:size-2 after:rounded-tl-lg after:shadow-[-3.5px_-3.5px_0_2px_#fff]'>
              <Checkbox
                checked={isSelected}
                onUpdate={() => cartApi.toggleSelectedCartItem(id)}
              />
            </div>

            <Image
              fill
              alt={images[0].name}
              objectFit='cover'
              src={images[0].path}
            />
          </div>

          <div className='flex w-full grow flex-col gap-2'>
            <Link
              className='max-md:text-pre-xs line-clamp-2 w-fit text-base font-medium hover:underline max-lg:text-xsm'
              href={LINKS.products(id)}
            >
              {name}
            </Link>

            <Text>{firm || 'OTIS'}</Text>

            <div className='flex flex-wrap items-center gap-2.5'>
              {categories?.map((category) => (
                <Label
                  key={category.id}
                  className='pin-circle [&>.g-label__content]:!text-xs'
                  theme='unknown'
                >
                  {category.name}
                </Label>
              ))}
            </div>

            <div className='mt-auto flex items-center gap-4'>
              <Button size='l' view='flat' onClick={onRemove}>
                <Trash className='text-secondary' />
              </Button>
            </div>
          </div>
        </div>

        <div className='flex gap-6 max-lg:flex-col max-lg:items-end max-md:flex-row-reverse max-md:justify-between max-sm:flex-wrap lg:justify-end'>
          <div className='flex flex-col items-end max-lg:w-full max-md:w-fit lg:pr-8'>
            <Text color='secondary' variant='subheader-3'>
              {getFormatSum(count * Number.parseInt(price))}
            </Text>

            <Text className='text-xs font-semibold' color='danger'>
              (с НДС)
            </Text>
          </div>

          <div>
            <div className='flex select-none items-center gap-4'>
              <Button
                disabled={count <= 1}
                size='l'
                view='normal'
                onClick={() => cartApi.decrementCartItem(id)}
              >
                <Icon data={Minus} />
              </Button>

              <Text
                className='min-w-10 max-w-10 text-center'
                variant='subheader-2'
              >
                {count}
              </Text>

              <Button
                disabled={count >= 50}
                size='l'
                view='normal'
                onClick={() => cartApi.incrementCartItem(id)}
              >
                <Icon data={Plus} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
