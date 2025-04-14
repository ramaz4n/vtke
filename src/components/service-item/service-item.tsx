import { MouseEvent } from 'react';

import { Circles3Plus } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';
import Link from 'next/link';

import { LINKS } from '@/shared/constants/links.ts';
import { ServiceProps } from '@/shared/types/api/service.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { cn } from '@/shared/utils/cn.ts';
import { getFormatSum } from '@/shared/utils/get-format-sum.ts';

export interface ServiceItemProps extends ServiceProps {
  isInCart?: boolean;
  onCartAdd?: (item: ServiceProps) => void;
}

export const ServiceItem = ({
  isInCart = false,
  onCartAdd,
  ...props
}: ServiceItemProps) => {
  const { id, name, price } = props;
  const toCardHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onCartAdd?.(props);
  };

  return (
    <Link
      className='flex flex-col justify-between rounded-2xl px-3 shadow-lg duration-300 max-md:px-1 md:py-2'
      href={LINKS.services(id)}
    >
      <div className='flex flex-col'>
        <p className='line-clamp-2 text-balance text-lg font-semibold leading-snug max-md:text-sm'>
          {name}
        </p>

        <span className='text-foreground-text mt-2.5 block text-base font-semibold max-md:text-base'>
          {getFormatSum(Number.parseInt(price))}
        </span>
      </div>

      <Button
        selected={isInCart}
        size='l'
        className={cn('mt-2 !text-white', {
          'pointer-events-none select-none': isInCart,
        })}
        onClick={toCardHandler}
      >
        {!isInCart && <Icon data={Circles3Plus} />} Закзать услугу
      </Button>
    </Link>
  );
};
