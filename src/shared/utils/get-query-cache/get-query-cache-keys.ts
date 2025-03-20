import { QueryClient, QueryKey } from '@tanstack/react-query';

import { QueryKeys } from '@/shared/types/api/query-keys.ts';

/**
 * Функция для получения всех ключей кеша по единому main ключу
 * **/
export const getQueryCacheKeys = (
  queryClient: QueryClient,
  cacheKey: QueryKeys | string,
): Readonly<Array<QueryKey | null>> => {
  const allCache = queryClient.getQueryCache().getAll();

  const currentCache = allCache.find((el) => el.queryKey.includes(cacheKey));

  if (!currentCache) {
    return [];
  }

  return (
    currentCache?.queryKey.map((el) =>
      el === undefined ? null : (el as QueryKey),
    ) || []
  );
};
