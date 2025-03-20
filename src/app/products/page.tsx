'use client';

import { Skeleton, Text } from '@gravity-ui/uikit';
import { useUnit } from 'effector-react';
import { VscMenu } from 'react-icons/vsc';

import { CatalogDrawer } from '@/components/drawers/catalog-drawer/catalog-drawer.tsx';
import { ProductItem } from '@/components/product-item/product-item.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';
import { useProducts } from '@/shared/hooks/api/use-products.ts';
import { showDrawerEvent } from '@/shared/models/drawer.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';
import { Button } from '@/shared/ui/button/button.tsx';

// export const metadata: Metadata = {
//   description: 'Каталог товаров',
//   title: 'Кататог товаров',
// };

export default function Page() {
  const { models, isLoading } = useProducts();

  const showDrawer = useUnit(showDrawerEvent);

  return (
    <MainContainer>
      <div className='px-3.5 py-6'>
        <Breadcrumbs items={[{ href: LINKS.products(), text: 'Продукты' }]} />
      </div>
      <div className='flex w-full flex-col gap-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold'>Продукты</h1>

          <Button
            className='flex h-[50px] w-fit items-center'
            size='xl'
            onClick={() => showDrawer('catalog')}
          >
            <div className='flex items-center gap-4'>
              <VscMenu className='size-8' />
              <Text className='hidden sm:block' variant='display-1'>
                Каталог
              </Text>
            </div>
          </Button>
        </div>

        {isLoading ? (
          <div className='relative grid w-full grid-cols-1 gap-3 pb-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-4 2xl:grid-cols-5 2xl:gap-6'>
            <Skeleton className='h-[400px] w-[150px] rounded-3xl' />
            <Skeleton className='h-[400px] w-[150px] rounded-3xl' />;
            <Skeleton className='h-[400px] w-[150px] rounded-3xl' />;
            <Skeleton className='h-[400px] w-[150px] rounded-3xl' />;
            <Skeleton className='h-[400px] w-[150px] rounded-3xl' />;
          </div>
        ) : (
          <div className='relative grid w-full grid-cols-1 gap-3 pb-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-4 2xl:grid-cols-5 2xl:gap-6'>
            {models?.map((model) => (
              <ProductItem
                key={model.id}
                description={model.description}
                id={model.id}
                imageSrc={model.images[0]?.path}
                name={model.name}
                price={model.price}
              />
            ))}
          </div>
        )}
      </div>

      <CatalogDrawer />
    </MainContainer>
  );
}
