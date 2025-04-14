import { EffectorNext } from '@effector/next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fork, serialize } from 'effector';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { ProductPage } from '@/containers/product-page-container/product-page-container.tsx';
import { productsApi } from '@/shared/api/products.ts';
import { LINKS } from '@/shared/constants/links.ts';
import { $breadcrumbs } from '@/shared/models/breadcrumbs.ts';
import { ProductProps } from '@/shared/types/api/products.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import {
  ServerMetadataGenerate,
  ServerPageProps,
} from '@/shared/types/globals.ts';

// динамическое обновления метаданных
export async function generateMetadata({
  params,
}: ServerMetadataGenerate): Promise<Metadata> {
  const { id } = await params;

  const { data } = await productsApi.view(id);

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

export default async function Page({ params }: ServerPageProps) {
  const { id } = await params;

  if (!id) {
    return redirect(LINKS.notFound);
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => productsApi.view(id),
    queryKey: [QueryKeys.PRODUCT_VIEW, id],
  });

  const fetchedQueryData: { data: ProductProps } | undefined =
    queryClient.getQueryData([QueryKeys.PRODUCT_VIEW, id]);

  if (!fetchedQueryData?.data?.id) {
    return redirect(LINKS.notFound);
  }

  const breadcrumbs = [];

  const category = fetchedQueryData?.data?.categories.at(0);
  const name = fetchedQueryData?.data?.name;

  const listParams = { category: category?.id };

  await queryClient.prefetchQuery({
    queryFn: () => productsApi.list(listParams),
    queryKey: [QueryKeys.PRODUCTS_VIEW, listParams, id],
  });

  if (category) {
    breadcrumbs.push({
      href: LINKS.products(),
      text: category.name,
    });
  }

  if (name) {
    breadcrumbs.push({
      text: name,
    });
  }

  const scope = fork({ values: [[$breadcrumbs, breadcrumbs]] });
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
