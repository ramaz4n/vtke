import { apiRequest } from '@/shared/api/api-request.ts';
import {
  CategoryCreateProps,
  CategoryProps,
  CategoryRequestProps,
  CategoryUpdateProps,
} from '@/shared/types/api/categories.ts';
import { FetchPaginationResponse, FetchResponse } from '@/shared/types/global.ts';
import { concatUrlSlug } from '@/shared/utils/concat-url-slug.ts';

export const productCategoriesApi = {
  create: (
    data: CategoryCreateProps,
  ): FetchResponse<{ category: CategoryProps }> =>
    apiRequest({ data, method: 'POST', url: '/api/categories' }),

  delete: (slug?: string): FetchResponse<{ category: CategoryProps }> =>
    apiRequest({ method: 'DELETE', url: concatUrlSlug('/api/categories', slug) }),

  list: (
    params?: CategoryRequestProps,
  ): FetchPaginationResponse<CategoryProps[]> =>
    apiRequest({ params, url: '/api/categories' }),

  update: (
    data: CategoryUpdateProps,
    slug?: string,
  ): FetchResponse<{ category: CategoryProps }> =>
    apiRequest({ data, method: 'PUT', url: concatUrlSlug('/api/categories', slug) }),
};
