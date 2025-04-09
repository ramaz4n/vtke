'use client';
import { Text } from '@gravity-ui/uikit';
import { useParams } from 'next/navigation';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';

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
        // items={[
        //   { href: LINKS.news(), text: 'Новости' },
        //   { href: LINKS.news(id.toString()), text: id.toString() },
        // ]}
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
