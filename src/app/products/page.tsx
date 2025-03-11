'use client';

import { Skeleton } from '@gravity-ui/uikit';

import { CategoryItem } from '@/components/category-item/category-item.tsx';
import NewsCard from '@/components/news/news-card/news-card.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { useProductCategories } from '@/shared/hooks/api/use-product-categories.ts';
import { useProducts } from '@/shared/hooks/api/use-products.ts';

// export const metadata: Metadata = {
//   description: 'Каталог товаров',
//   title: 'Кататог товаров',
// };

export default function Page() {
  const { models, isFetching, isLoading } = useProducts();
  const { models: categoryModels, isLoading: isLoadingCategories } =
    useProductCategories();

  return (
    <MainContainer>
      <div>
        {!isLoadingCategories &&
          categoryModels?.map((model) => (
            <CategoryItem
              key={model.id}
              id={model.id}
              name={model.name}
              onClick={() => console.log('clicked')}
            />
          ))}
      </div>

      <div className='relative grid w-full grid-cols-1 gap-9 py-16'>
        {isFetching ? (
          <section className='gap-4 px-4 py-2.5 flex-between'>
            <div className='inline-flex items-center gap-2'>
              <Skeleton className='size-8' />

              <div className='flex flex-col gap-1'>
                <Skeleton className='h-4 w-44' />

                <Skeleton className='h-3 w-32' />
              </div>
            </div>

            <Skeleton className='size-7' />
          </section>
        ) : (
          models?.map((model) => (
            <NewsCard
              key={model.id}
              description={model.description}
              id={model.id}
              image={model.images[0]?.path}
              title='Тестовая новость и новость и новость'
            />
          ))
        )}
      </div>
    </MainContainer>
  );
}
