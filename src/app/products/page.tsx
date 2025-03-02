'use client';

import NewsCard from '@/components/news/news-card/news-card.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';
import { useProducts } from '@/shared/hooks/api/use-products.ts';

// export const metadata: Metadata = {
//   description: 'Каталог товаров',
//   title: 'Кататог товаров',
// };

export default function Page() {
  const { models, isFetching, isLoading } = useProducts();

  console.log('models', models);
  console.log('isFetching', isFetching);
  console.log('isLoading', isLoading);

  return (
    <MainContainer>
      <div className='grid w-full grid-cols-1 gap-9 py-16'>
        {!isLoading &&
          models?.map((model) => (
            <NewsCard
              key={model.id}
              description={model.description}
              id={model.id}
              image={model.images[0]?.path}
              title='Тестовая новость и новость и новость'
            />
          ))}
      </div>
    </MainContainer>
  );
}
