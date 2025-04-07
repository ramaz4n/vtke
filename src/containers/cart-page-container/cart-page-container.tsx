'use client';

import { useEffect, useState } from 'react';

import { CircleExclamationFill } from '@gravity-ui/icons';
import { Card, Checkbox, Divider, Icon, Text } from '@gravity-ui/uikit';
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
import { getFormatSum } from '@/shared/utils/get-format-sum.ts';

export const CartPageContainer = () => {
  const cartApi = useCart();

  const modal = useModal();

  const [acceptTradeRules, setAcceptTradeRules] = useState(false);

  const totalCountItems = cartApi.getLength();
  const totalSum = cartApi.getTotalSum();
  const totalSelectedItems = cartApi.getTotalSelectedItems();

  const onCheckboxUpdate = (value: boolean) => {
    if (value) {
      cartApi.initSelectedItems();
    } else {
      cartApi.clearSelectedItems();
    }
  };

  const onRemoveOutCartSelected = () => {
    if (cartApi.isAllSelected) {
      modal.show('reset-cart');
    } else {
      cartApi.removeOutCartSelected();
    }
  };

  useEffect(() => {
    cartApi.initSelectedItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

          <div className='inline-flex h-6 items-center gap-2.5'>
            <Checkbox
              checked={cartApi.isAllSelected}
              size='l'
              onUpdate={onCheckboxUpdate}
            >
              Выбрать все
            </Checkbox>

            {!!cartApi.selectedCartItems?.length && (
              <Text color='secondary'>
                {plural(
                  cartApi.selectedCartItems?.length,
                  'Выбран',
                  'Выбрано',
                  'Выбрано',
                )}{' '}
                {plural(
                  cartApi.selectedCartItems?.length,
                  '%d товар',
                  '%d товара',
                  '%d товаров',
                )}{' '}
              </Text>
            )}

            {!!totalSelectedItems && (
              <Button
                size='s'
                view='flat-danger'
                onClick={onRemoveOutCartSelected}
              >
                Удалить выбранные
              </Button>
            )}
          </div>

          <section className='flex flex-col gap-6'>
            {Object.entries(cartApi.cartStore).map(([id, { item, count }]) => (
              <ProductCartItem count={count} {...item} key={id} />
            ))}
          </section>
        </Card>

        <Card className='sticky top-28 h-fit' size='l' view='filled'>
          <div className='flex flex-col gap-4'>
            {totalSelectedItems ? (
              <div>
                <Text className='mb-8 block' variant='subheader-3'>
                  Ваша корзина
                </Text>

                <div className='flex-between'>
                  <span>Товары ({totalSelectedItems})</span>
                  <span className='font-bold'>{getFormatSum(totalSum)}</span>
                </div>

                <Divider className='mb-4 mt-2' />

                <div className='flex-between'>
                  <span className='text-xl font-bold'>Итого</span>
                  <span className='text-success text-base font-bold'>
                    {getFormatSum(totalSum)}
                  </span>
                </div>
              </div>
            ) : (
              <div className='flex gap-4 rounded-lg bg-[var(--g-color-private-blue-50-solid)] p-3 text-secondary'>
                <Icon className='clamp-6' data={CircleExclamationFill} />

                <p>Выберите товары, чтобы перейти к оформлению заказа</p>
              </div>
            )}

            <Button
              disabled={!cartApi.selectedCartItems.length || !acceptTradeRules}
              size='xl'
              width='max'
            >
              К оформлению
            </Button>

            <div className='flex items-center gap-2.5'>
              <Checkbox
                checked={acceptTradeRules}
                disabled={!totalSelectedItems}
                onUpdate={setAcceptTradeRules}
              />

              <span className='text-xs'>
                {' '}
                Соглашаюсь с{' '}
                <Link
                  className='transition-all duration-300 hover:text-primary'
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
