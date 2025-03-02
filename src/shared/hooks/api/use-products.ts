import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { productsApi } from '@/shared/api/products.ts';
import { ProductRequestProps } from '@/shared/types/api/products.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';

export const useProducts = <T extends ProductRequestProps>(params?: T) => {
  const q = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => productsApi.list(params),
    queryKey: [QueryKeys.PRODUCTS_VIEW, params],
  });

  return {
    ...q,
    models: q.data?.data || [],
    pagination: {},
  };
};
