import { EffectorNext } from '@effector/next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fork, serialize } from 'effector';
import { Metadata } from 'next';

import { ProductsPage } from '@/containers/products-page-container/products-page-container.tsx';
import { productsApi } from '@/shared/api/products.ts';
import { $breadcrumbs } from '@/shared/models/breadcrumbs.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';

export const metadata: Metadata = {
  description: 'Каталог товаров',
  title: 'Кататог товаров',
};

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => productsApi.list(),
    queryKey: [QueryKeys.PRODUCTS_VIEW, null],
  });

  const scope = fork({
    values: [[$breadcrumbs, [{ text: 'Продукты' }]]],
  });

  const serialized = serialize(scope);
  const dehydratedState = dehydrate(queryClient);

  return (
    <EffectorNext values={serialized}>
      <HydrationBoundary state={dehydratedState}>
        <ProductsPage />
      </HydrationBoundary>
    </EffectorNext>
  );
}
