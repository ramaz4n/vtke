import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { productsApi } from '@/shared/api/products.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';

export const useProduct = () => {
  const id = useParams()?.id?.toString();
  const q = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => productsApi.view(id),
    queryKey: [QueryKeys.PRODUCT_VIEW, id],
  });

  return {
    ...q,
    id,
    model: q.data?.data,
  };
};
