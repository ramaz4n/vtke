import { Text } from '@gravity-ui/uikit';
import Link from 'next/link';

import { ProductItemProps } from '@/shared/types/api/products.ts';
import { Button } from '@/shared/ui/button/button.tsx';

export const ProductItem = ({
  id,
  name,
  imageSrc,
  price,
  description,
}: ProductItemProps) => {
  const toCardHandler = () => {
    console.log('click');
  };

  return (
    <Link
      className='max-w[290] flex flex-col justify-between gap-1 rounded-3xl px-3 py-2 duration-300 hover:shadow-lg'
      href={`/products/${id}`}
    >
      <img
        alt={name}
        className='h-[280px] rounded-3xl'
        loading='lazy'
        src={imageSrc}
      />

      <Text className='text-foreground-text mb-2' variant='display-1'>
        {name}
      </Text>

      <Text
        className='text-foreground-text mb-2 font-bold'
        color='positive'
        variant='header-1'
      >
        {Number(price).toFixed(0)} ₽
      </Text>

      <div
        className='truncate'
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>

      <Button className='mt-1' size='xl' onClick={toCardHandler}>
        В корзину
      </Button>
    </Link>
  );
};
