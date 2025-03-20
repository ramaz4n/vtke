'use client';
import { Skeleton, Text } from '@gravity-ui/uikit';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';
import { useProduct } from '@/shared/hooks/api/use-product.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';

// export const metadata: Metadata = {
//   description: 'Каталог товаров',
//   title: 'Кататог товаров',
// };

export default function Page() {
  const { model, id, isLoading } = useProduct();

  console.log(model);

  return (
    <MainContainer>
      <div className='px-3.5 py-6'>
        <Breadcrumbs
          enabledStartLink
          items={[
            { href: LINKS.products(), text: 'Продукты' },
            { href: '', text: model?.name || '' },
          ]}
        />
      </div>
      {isLoading ? (
        <div className='flex flex-col gap-16 pb-20 pt-7'>
          <div className='flex items-center gap-16'>
            <Skeleton className='size-[500px] rounded-3xl' />
            <Skeleton className='h-[20px] w-full'></Skeleton>
          </div>

          <Skeleton className='h-[20px] w-full'></Skeleton>
        </div>
      ) : (
        <div className='flex flex-col gap-16 pb-20 pt-7'>
          <div className='flex items-center gap-16'>
            <img
              alt='test'
              className='size-[500px] rounded-3xl'
              loading='lazy'
              src={model?.images[0].path}
            />
            <Text variant='display-4'>{model?.name}</Text>
          </div>

          <Text
            dangerouslySetInnerHTML={{ __html: model?.description || '' }}
            variant='body-3'
          />
        </div>
      )}
    </MainContainer>
  );
}
