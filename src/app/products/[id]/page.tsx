import { EffectorNext } from '@effector/next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fork, serialize } from 'effector';
import { Metadata } from 'next';

import { ProductPage } from '@/containers/product-page-container/product-page-container.tsx';
import { productsApi } from '@/shared/api/products.ts';
import { $breadcrumbs } from '@/shared/models/breadcrumbs.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';

// динамическое обновления метаданных
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data } = await productsApi.view(params.id);

  return {
    description: data.description,
    openGraph: {
      description: data.description,
      // images: [
      //   {
      //     height: 600,
      //     url: product.image,
      //     // Картинка для OpenGraph
      //     width: 800,
      //   },
      // ],
      title: data.name,
    },
    title: data.name,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const id = searchParams.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => productsApi.view(id as string),
    queryKey: [QueryKeys.PRODUCT_VIEW, id],
  });

  const scope = fork({
    values: [[$breadcrumbs, [{ text: id }]]],
  });

  const serialized = serialize(scope);
  const dehydratedState = dehydrate(queryClient);

  return (
    <EffectorNext values={serialized}>
      <HydrationBoundary state={dehydratedState}>
        <ProductPage />
      </HydrationBoundary>
    </EffectorNext>
  );
}
