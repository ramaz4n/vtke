import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { ProductPage } from '@/components/products-page-container/products-page-container.tsx';
import { productsApi } from '@/shared/api/products.ts';
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

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductPage />
    </HydrationBoundary>
  );
}
