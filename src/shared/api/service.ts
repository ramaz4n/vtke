import { apiRequest } from '@/shared/api/api-request.ts';
import {
  CreateServiceProps,
  ServiceProps,
  ServiceRequestProps,
} from '@/shared/types/api/service.ts';
import {
  FetchPaginationResponse,
  FetchResponse,
} from '@/shared/types/globals.ts';
import { concatUrlSlug } from '@/shared/utils/concat-url-slug.ts';

export const serviceApi = {
  create: (
    data: CreateServiceProps,
  ): FetchResponse<{ category: ServiceProps }> =>
    apiRequest({ data, method: 'POST', url: '/api/service' }),

  delete: (slug?: string): FetchResponse<{ product: ServiceProps }> =>
    apiRequest({ method: 'DELETE', url: concatUrlSlug('/api/service', slug) }),

  list: (
    params?: ServiceRequestProps,
  ): FetchPaginationResponse<ServiceProps[]> =>
    apiRequest({ params, url: '/api/service' }),

  update: (
    data: Partial<CreateServiceProps>,
    slug?: string,
  ): FetchResponse<{ product: ServiceProps }> =>
    apiRequest({
      data,
      method: 'PATCH',
      url: concatUrlSlug('/api/service', slug),
    }),

  view: (slug?: string): FetchResponse<{ data: ServiceProps }> =>
    apiRequest({ url: concatUrlSlug('/api/service', slug) }),
};
