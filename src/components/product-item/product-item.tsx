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
      className='flex flex-col justify-between rounded-2xl px-3 duration-300 hover:shadow-lg max-md:px-1 md:py-2'
      href={LINKS.products(id)}
    >
      <div className='flex flex-col'>
        <div className='relative mb-4 overflow-hidden rounded-3xl max-sm:aspect-square max-sm:max-h-48 sm:h-72'>
          <Image
            fill
            alt={name}
            loading='lazy'
            src={images.length ? images[0].path : '/images/test.png'}
          />
        </div>

        <span className='text-foreground-text block text-lg font-bold max-md:text-base'>
          {getFormatSum(Number.parseInt(price))}
        </span>

        <p className='line-clamp-2 text-base font-medium max-md:text-sm'>
          {name}
        </p>

        <div className='flex gap-1.5'>
          {firm && (
            <Fragment>
              <Text
                className='text-foreground-text mb-2 max-md:!text-xs'
                ellipsisLines={2}
                variant='subheader-1'
              >
                {firm}
              </Text>
              /
            </Fragment>
          )}

          <div
            className='g-color-text_color_secondary line-clamp-1 whitespace-nowrap max-md:text-xs'
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
