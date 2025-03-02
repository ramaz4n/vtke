import type { Metadata } from 'next';

import NewsCard from '@/components/news/news-card/news-card.tsx';
import MainContainer from '@/containers/main-container/main-container.tsx';

export const metadata: Metadata = {
  description: 'Новости',
  title: 'Новости',
};

const desk =
  'Доставили в срок. Хорошая водолазка,швы ровные, нитки не торчат, мягкая и теплая. Мужу понравилась. Не давит. Тянется. Размер подошёл.';

export default function Page() {
  const logo = '/images/test.png';

  return (
    <MainContainer>
      <div className='grid w-full grid-cols-1 gap-9 py-16'>
        <NewsCard
          key={12}
          description={desk}
          id={1}
          image={logo}
          title='Тестовая новость и новость и новость'
        />

        <NewsCard
          key={1}
          description={desk}
          id={2}
          image={logo}
          title='Тестовая новость и новость и новость'
        />
      </div>
    </MainContainer>
  );
}
