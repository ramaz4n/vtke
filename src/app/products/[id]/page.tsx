import { Text } from '@gravity-ui/uikit';
import type { Metadata } from 'next';
import { useParams } from 'next/navigation';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { LINKS } from '@/shared/constants/links.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';

export const metadata: Metadata = {
  description: 'Каталог товаров',
  title: 'Кататог товаров',
};

export default function Page() {
  const { id } = useParams();
  // const queries = useQuery({
  //   placeholderData: keepPreviousData,
  //   queryFn: () => newsApi.list(),
  //   queryKey: [QueryKeys.NEWS],
  // });
  //
  // console.log(queries?.data?.data);

  console.log(id);

  return (
    <MainContainer>
      <div className='px-3.5 py-6'>
        <Breadcrumbs
          enabledStartLink
          items={[
            { href: LINKS.products(), text: 'Продукты' },
            { href: LINKS.products(id.toString()), text: id.toString() },
          ]}
        />
      </div>
      <div className='flex flex-col gap-16 pb-20 pt-7'>
        <div className='flex items-center gap-16'>
          <img
            alt='test'
            className='size-[500px] rounded-3xl'
            src='/images/test.png'
          />
          <Text variant='display-4'>Тестовая новость и новость и новость</Text>
        </div>

        <Text variant='body-3'>
          Доставили в срок. Хорошая водолазка,швы ровные, нитки не торчат,
          мягкая и теплая. Мужу понравилась. Не давит. Тянется. Размер подошёл.
          Доставили в срок. Хорошая водолазка,швы ровные, нитки не торчат,
          мягкая и теплая. Мужу понравилась. Не давит. Тянется. Размер подошёл.
          Доставили в срок. Хорошая водолазка,швы ровные, нитки не торчат,
          мягкая и теплая. Мужу понравилась. Не давит. Тянется. Размер подошёл.
          Доставили в срок. Хорошая водолазка,швы ровные, нитки не торчат,
          мягкая и теплая. Мужу понравилась. Не давит. Тянется. Размер подошёл.
          Доставили в срок. Хорошая водолазка,швы ровные, нитки не торчат,
          мягкая и теплая. Мужу понравилась. Не давит. Тянется. Размер подошёл.
          Доставили в срок. Хорошая водолазка,швы ровные, нитки не торчат,
          мягкая и теплая. Мужу понравилась. Не давит. Тянется. Размер подошёл.
          Доставили в срок. Хорошая водолазка,швы ровные, нитки не торчат,
          мягкая и теплая. Мужу понравилась. Не давит. Тянется. Размер подошёл.
          Доставили в срок. Хорошая водолазка,швы ровные, нитки не торчат,
          мягкая и теплая. Мужу понравилась. Не давит. Тянется. Размер подошёл.
        </Text>
      </div>
    </MainContainer>
  );
}
