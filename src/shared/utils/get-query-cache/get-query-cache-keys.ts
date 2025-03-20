import { QueryClient } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/types/api/query-keys.ts';

export const getQueryCacheKeys = (
  queryClient: QueryClient,
  cacheKey: QueryKeys,
): Readonly<Array<string | null>> => {
  const allCache = queryClient.getQueryCache().getAll();

  const productsCache = allCache.find((el) => el.queryKey.includes(cacheKey));

  if (!productsCache) {
    return [];
  }

  return (
    productsCache?.queryKey.map((el) =>
      el === undefined ? null : (el as string),
    ) || []
  );
};
