import { apiRequest } from '@/shared/api/api-request.ts';
import {
  ProductProps,
  ProductRequestProps,
} from '@/shared/types/api/products.ts';
import { FetchResponse } from '@/shared/types/globals.ts';
import { concatUrlSlug } from '@/shared/utils/concat-url-slug.ts';

export const productsApi = {
  list: (
    params?: ProductRequestProps,
  ): FetchResponse<{ data: ProductProps[] }> =>
    apiRequest({ params, url: '/api/product' }),

  view: (slug?: string): FetchResponse<{ data: ProductProps }> =>
    apiRequest({ url: concatUrlSlug('/api/product', slug) }),
};
