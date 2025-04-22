import { apiRequest } from '@/shared/api/api-request.ts';
import { FetchResponse } from '@/shared/types/globals.ts';

export const searchApi = {
  search: (params: { q: string }): FetchResponse<any> =>
    apiRequest({ method: 'GET', params, url: '/api/search' }),
};
