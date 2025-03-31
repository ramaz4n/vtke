import { Fragment, MouseEvent } from 'react';

import { ShoppingCart } from '@gravity-ui/icons';
import { Icon, Text } from '@gravity-ui/uikit';
import Image from 'next/image';
import Link from 'next/link';

import { LINKS } from '@/shared/constants/links.ts';
import { ProductProps } from '@/shared/types/api/products.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { cn } from '@/shared/utils/cn.ts';
import { getFormatSum } from '@/shared/utils/get-format-sum.ts';

export interface ProductItemProps extends ProductProps {
  isInCart?: boolean;
  onCartAdd?: (item: ProductProps) => void;
}

export const ProductItem = ({
  isInCart = false,
  onCartAdd,
  ...props
}: ProductItemProps) => {
  const { id, name, price, firm, description, images } = props;
  const toCardHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onCartAdd?.(props);
  };

  return (
    <Link
      className='flex flex-col justify-between rounded-2xl px-3 py-2 duration-300 hover:shadow-lg'
      href={LINKS.products(id)}
    >
      <div className='flex flex-col gap-2'>
        <div className='relative h-72 overflow-hidden rounded-3xl'>
          <Image
            fill
            alt={name}
            loading='lazy'
            src={images.length ? images[0].path : '/images/test.png'}
          />
        </div>

        <Text className='text-foreground-text font-bold' variant='header-1'>
          {getFormatSum(Number.parseInt(price))}
        </Text>

        <Text className='line-clamp-2' variant='subheader-2'>
          {name}
        </Text>

        <div className='flex gap-1.5'>
          {firm && (
            <Fragment>
              <Text
                className='text-foreground-text mb-2'
                ellipsisLines={2}
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

      <Button
        selected={isInCart}
        size='l'
        className={cn('mt-2 !text-white', {
          'pointer-events-none select-none': isInCart,
        })}
        onClick={toCardHandler}
      >
        {!isInCart && <Icon data={ShoppingCart} />}В{' '}
        {isInCart ? 'корзине' : 'корзину'}
      </Button>
    </Link>
  );
};
