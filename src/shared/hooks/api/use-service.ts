import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { serviceApi } from '@/shared/api/service.ts';
import { CategoryProps } from '@/shared/types/api/categories.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import {
  ServiceProps,
  ServiceRequestProps,
} from '@/shared/types/api/service.ts';

export const useService = (params?: ServiceRequestProps) => {
  const q = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => serviceApi.list(params),
    queryKey: [QueryKeys.SERVICE_LIST, params],
  });

  const groupByCategory: Record<
    number,
    { category: CategoryProps; services: ServiceProps[] }
  > = (() => {
    if (!q.data?.data || !q.data?.data.length) return {};

    const result: Record<
      number,
      { category: CategoryProps; services: ServiceProps[] }
    > = {};

    for (const el of q.data.data) {
      if (result[el.category.id]) {
        const prev = result[el.category.id].services || [];

        prev.push(el);

        result[el.category.id] = {
          category: el.category,
          services: prev,
        };
      } else {
        result[el.category.id] = {
          category: el.category,
          services: [el],
        };
      }
    }

    return result;
  })();

  return {
    ...q,
    groupByCategory,
    models: q.data?.data || [],
    pagination: q.data?.pagination,
  };
};
