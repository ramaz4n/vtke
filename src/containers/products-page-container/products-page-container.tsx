'use client';

import { Bars } from '@gravity-ui/icons';
import { Skeleton, Text } from '@gravity-ui/uikit';
import { useUnit } from 'effector-react';

import { CatalogDrawer } from '@/components/drawers/catalog-drawer/catalog-drawer.tsx';
import { ProductItem } from '@/components/product-item/product-item.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { useProducts } from '@/shared/hooks/api/use-products.ts';
import { useCart } from '@/shared/hooks/use-cart.ts';
import { showDrawerEvent } from '@/shared/models/drawer.ts';
import { ProductProps } from '@/shared/types/api/products.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';
import { Button } from '@/shared/ui/button/button.tsx';

export const ProductsPage = () => {
  const { models, isLoading } = useProducts();
  const cartApi = useCart();
  const showDrawer = useUnit(showDrawerEvent);

  const onCartAddHandler = (props: ProductProps) => {
    cartApi.setCartItem(props);
  };

  return (
    <MainContainer className='py-6'>
      <Breadcrumbs />

      <div className='flex w-full flex-col gap-8'>
        <div className='flex items-center justify-between'>
          <Text as='h1' variant='header-2'>
            Продукты
          </Text>

          <Button
            className='flex h-[50px] w-fit items-center'
            size='xl'
            onClick={() => showDrawer('catalog')}
          >
            <div className='flex items-center gap-4'>
              <Bars className='size-8' />
              <Text className='hidden sm:block' variant='display-1'>
                Каталог
              </Text>
            </div>
          </Button>
        </div>

        {isLoading ? (
          <div className='relative grid w-full grid-cols-1 gap-3 pb-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-4 2xl:grid-cols-5 2xl:gap-6'>
            <Skeleton className='h-[400px] rounded-3xl' />
            <Skeleton className='h-[400px] rounded-3xl' />;
            <Skeleton className='h-[400px] rounded-3xl' />;
            <Skeleton className='h-[400px] rounded-3xl' />;
            <Skeleton className='h-[400px] rounded-3xl' />;
          </div>
        ) : (
          <div className='relative grid w-full grid-cols-1 gap-3 pb-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-4 2xl:grid-cols-5 2xl:gap-6'>
            {models?.map((model) => (
              <ProductItem
                key={model.id}
                isInCart={cartApi.isInCart(model.id)}
                onCartAdd={onCartAddHandler}
                {...model}
              />
            ))}
          </div>
        )}
      </div>

      <CatalogDrawer />
    </MainContainer>
  );
};
