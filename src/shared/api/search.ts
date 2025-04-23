import { apiRequest } from '@/shared/api/api-request.ts';
import { SearchCoreProps } from '@/shared/types/api/search.ts';

export const searchApi = {
  search: (params: { q: string }): Promise<SearchCoreProps[]> =>
    apiRequest({ method: 'GET', params, url: '/api/search' }),
};
