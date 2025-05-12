'use client';

import { Text } from '@gravity-ui/uikit';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { serviceApi } from '@/shared/api/service.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';

export const ServicePageContainer = () => {
  const { id } = useParams();

  const query = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => serviceApi.view(id?.toString()),
    queryKey: [QueryKeys.SERVICE_VIEW, id],
  });

  return (
    <MainContainer className='py-6'>
      <Breadcrumbs />

      <section>
        {query.data?.image && (
          <div className='relative h-72 overflow-hidden rounded-3xl'>
            <Image
              fill
              alt={query.data?.name}
              objectFit='cover'
              src={query.data?.image}
            />
          </div>
        )}

        <div className='my-4.5 flex flex-wrap items-center gap-2.5'>
          <Text variant='header-2'>{query.data?.name}</Text>

          <span className='inline-flex items-center gap-1 rounded-md bg-zinc-200 px-2.5 py-0.5 transition-all duration-300 hover:bg-zinc-200/50'>
            {query.data?.category.name}
          </span>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: query.data?.description ?? '' }}
        />
      </section>
    </MainContainer>
  );
};
