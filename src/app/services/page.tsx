import { EffectorNext } from '@effector/next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fork, serialize } from 'effector';
import type { Metadata } from 'next';

import { ServicesPageContainer } from '@/containers/services-page-container/services-page-container.tsx';
import { serviceApi } from '@/shared/api/service.ts';
import { $breadcrumbs } from '@/shared/models/breadcrumbs.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';

export const metadata: Metadata = {
  description: 'Услуги',
  title: 'Услуги',
};

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => serviceApi.list(),
    queryKey: [QueryKeys.SERVICE_LIST, null],
  });

  const scope = fork({
    values: [[$breadcrumbs, [{ text: 'Услуги' }]]],
  });

  const serialized = serialize(scope);
  const dehydratedState = dehydrate(queryClient);

  return (
    <EffectorNext values={serialized}>
      <HydrationBoundary state={dehydratedState}>
        <ServicesPageContainer />
      </HydrationBoundary>
    </EffectorNext>
  );
}
