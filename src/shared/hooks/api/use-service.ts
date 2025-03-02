import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { serviceApi } from '@/shared/api/service.ts';
import { QueryKeys } from '@/shared/types/api/query-keys.ts';
import { ServiceRequestProps } from '@/shared/types/api/service.ts';

export const useService = (params?: ServiceRequestProps) => {
  const q = useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => serviceApi.list(params),
    queryKey: [QueryKeys.SERVICE_LIST, params],
  });

  return {
    ...q,
    models: q.data?.data || [],
    pagination: q.data?.pagination,
  };
};
