import { EffectorNext } from '@effector/next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fork, serialize } from 'effector';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { ServicePageContainer } from '@/containers/service-page-container/service-page-container.tsx';
import { serviceApi } from '@/shared/api/service.ts';
import { LINKS } from '@/shared/constants/links.ts';
import { $breadcrumbs } from '@/shared/models/breadcrumbs.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { ServiceProps } from '@/shared/types/api/service.ts';
import {
  ServerMetadataGenerate,
  ServerPageProps,
} from '@/shared/types/globals.ts';

// динамическое обновления метаданных
export async function generateMetadata({
  params,
}: ServerMetadataGenerate): Promise<Metadata> {
  const { id } = await params;

  const data = await serviceApi.view(id);

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
    queryFn: () => serviceApi.view(id),
    queryKey: [QueryKeys.SERVICE_VIEW, id],
  });

  const fetchedQueryData: ServiceProps | undefined = queryClient.getQueryData([
    QueryKeys.SERVICE_VIEW,
    id,
  ]);

  if (!fetchedQueryData?.id) {
    return redirect(LINKS.notFound);
  }

  const breadcrumbs = [];

  const category = fetchedQueryData?.category;
  const name = fetchedQueryData?.name;

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
        <ServicePageContainer />
      </HydrationBoundary>
    </EffectorNext>
  );
}
