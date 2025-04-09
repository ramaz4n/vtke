'use client';

import { useParams } from 'next/navigation';

import MainContainer from '@/containers/main-container/main-container.tsx';
import { useProduct } from '@/shared/hooks/api/use-product.ts';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs/breadcrumbs.tsx';

export const ProductPage = () => {
  const { id } = useParams();
  const { model, isLoading } = useProduct();

  console.log(model);
  console.log(isLoading);
  console.log(id);

  return (
    <MainContainer className='py-6'>
      <Breadcrumbs />
    </MainContainer>
  );
};
