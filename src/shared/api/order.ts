import { apiRequest } from '@/shared/api/api-request.ts';
import { OrderProps } from '@/shared/types/api/orders.ts';
import { FetchResponse } from '@/shared/types/globals.ts';

export const orderApi = {
  create: (data: FormData): FetchResponse<{ data: OrderProps }> =>
    apiRequest({ data, method: 'POST', url: '/api/orders' }),
};
