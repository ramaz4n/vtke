'use client';
import { Card, Checkbox, Text } from '@gravity-ui/uikit';
import Link from 'next/link';
import plural from 'plural-ru';

import { ResetCartConfirmModal } from '@/components/modals/reset-cart-confirm-modal/reset-cart-confir-modal.tsx';
import { ProductCartItem } from '@/components/product-cart-item/product-cart-item.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';
import { useCart } from '@/shared/hooks/use-cart.ts';
import { useModal } from '@/shared/hooks/use-modal.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';
import { Button } from '@/shared/ui/button/button.tsx';

export const CartPageContainer = () => {
  const cartApi = useCart();

  const modal = useModal();

  const totalCountItems = cartApi.getLength();

  if (!totalCountItems)
    return (
      <MainContainer className='space-y-4 bg-[#f6f6f9] py-6'>
        <Breadcrumbs />

        <Card className='flex-col flex-center' size='l' view='filled'>
          <Text as='h1' variant='subheader-3'>
            В корзине сейчас пусто
          </Text>

          <Text
            className='mb-8 mt-2 text-center max-md:text-balance md:mb-10'
            color='secondary'
            variant='subheader-1'
          >
            Загляните в каталог — собрали там товары, которые могут вам
            понравиться
          </Text>

          <Link className='max-md:w-full' href={LINKS.products()}>
            <Button className='max-md:w-full' size='xl'>
              Перейти в каталог
            </Button>
          </Link>
        </Card>
      </MainContainer>
    );

  return (
    <MainContainer className='space-y-4 bg-[#f6f6f9] py-6'>
      <Breadcrumbs />

      <section className='relative grid gap-10 xl:grid-cols-[auto_20rem]'>
        <Card className='flex flex-col gap-y-6' size='l' view='filled'>
          <div className='flex h-9 items-start justify-between'>
            <div className='inline-flex items-end gap-2.5'>
              <Text as='h1' variant='header-2'>
                Корзина
              </Text>

              <Text className='!leading-7' color='secondary' variant='body-2'>
                {plural(totalCountItems, '%d товар', '%d товара', '%d товаров')}{' '}
              </Text>
            </div>

            <Button
              size='l'
              view='flat-action'
              onClick={() => modal.show('reset-cart')}
            >
              Очистить корзину
            </Button>
          </div>

          <div className='inline-flex items-center gap-2.5'>
            <Checkbox size='l'>Выбрать все</Checkbox>

            <Text color='secondary'>
              {plural(totalCountItems, 'Выбран', 'Выбрано', 'Выбрано')}{' '}
              {plural(totalCountItems, '%d товар', '%d товара', '%d товаров')}{' '}
            </Text>
          </div>

          <section className='flex flex-col gap-6'>
            {Object.entries(cartApi.cartStore).map(([id, { item, count }]) => (
              <ProductCartItem count={count} {...item} key={id} />
            ))}
          </section>
        </Card>

        <Card className='sticky top-28 h-fit' size='l' view='filled'>
          <div className='flex flex-col gap-4'>
            <div>
              <Text variant='subheader-1'>Ваша корзина</Text>
            </div>

            <Button size='xl' width='max'>
              К оформлению
            </Button>

            <div className='flex items-center gap-2.5'>
              <Checkbox />

              <span className='text-xs'>
                {' '}
                Соглашаюсь с{' '}
                <Link
                  className='hover:text-primary transition-all duration-300'
                  href='/'
                  rel='noreferrer'
                  target='_blank'
                >
                  правилами пользования торговой площадкой{' '}
                </Link>{' '}
                и возврата
              </span>
            </div>
          </div>
        </Card>
      </section>

      <ResetCartConfirmModal />
    </MainContainer>
  );
};
