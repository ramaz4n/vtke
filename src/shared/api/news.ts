import { apiRequest } from '@/shared/api/api-request.ts';
import { NewsProps, NewsRequestProps } from '@/shared/types/api/news.ts';
import { FetchResponse } from '@/shared/types/globals.ts';

export const newsApi = {
  list: (params?: NewsRequestProps): FetchResponse<{ data: NewsProps[] }> =>
    apiRequest({ params, url: '/api/news' }),

  view: (slug?: string): FetchResponse<{ data: NewsProps }> =>
    apiRequest({ slug, url: '/api/news' }),
};
