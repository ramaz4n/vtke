'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { serviceApi } from '@/shared/api/service.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';

export const ServicePageContainer = () => {
  const { id } = useParams();

  const q = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => serviceApi.view(id),
    queryKey: [QueryKeys.SERVICE_VIEW, id],
  });

  return (
    <MainContainer className='py-6'>
      <Breadcrumbs />

      <pre>{JSON.stringify(q.data, null, 2)}</pre>
    </MainContainer>
  );
};
