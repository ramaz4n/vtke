import { Fragment, MouseEvent } from 'react';

import { Text } from '@gravity-ui/uikit';
import Image from 'next/image';
import Link from 'next/link';

import { LINKS } from '@/shared/constants/links.ts';
import { ProductItemProps } from '@/shared/types/api/products.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Cart } from '@/shared/ui/icons/cart.tsx';
import { getFormatSum } from '@/shared/utils/get-format-sum.ts';

export const ProductItem = ({
  id,
  name,
  imageSrc,
  price,
  firm,
  description,
}: ProductItemProps) => {
  const toCardHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(firm, 'click');
  };

  return (
    <Link
      className='flex flex-col justify-between rounded-2xl px-3 py-2 duration-300 hover:shadow-lg'
      href={LINKS.products(id)}
    >
      <div className='flex flex-col gap-2'>
        <div className='relative h-72 overflow-hidden rounded-3xl'>
          <Image fill alt={name} loading='lazy' src={imageSrc} />
        </div>

        <Text className='text-foreground-text font-bold' variant='header-1'>
          {getFormatSum(Number.parseInt(price))}
        </Text>

        <Text
          className='text-foreground-text line-clamp-2'
          variant='subheader-1'
        >
          {name}
        </Text>

        <div className='flex gap-1.5'>
          {firm && (
            <Fragment>
              <Text
                className='text-foreground-text mb-2 line-clamp-2'
                variant='subheader-1'
              >
                {firm}
              </Text>
              /
            </Fragment>
          )}

          <div
            className='g-color-text_color_secondary line-clamp-1 whitespace-nowrap'
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>

      <Button className='mt-1 !text-white' size='l' onClick={toCardHandler}>
        <Cart />В корзину
      </Button>
    </Link>
  );
};
