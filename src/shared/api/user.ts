import { apiRequest } from '@/shared/api/api-request.ts';
import {
  UserProfileResponseProps,
  UserProps,
  UserRequestProps,
} from '@/shared/types/api/user.ts';
import {
  FetchPaginationResponse,
  FetchResponse,
} from '@/shared/types/global.ts';
import { concatUrlSlug } from '@/shared/utils/concat-url-slug.ts';

export const userApi = {
  list: (params?: UserRequestProps): FetchPaginationResponse<UserProps[]> =>
    apiRequest({ params, url: '/user' }),

  profile: (): Promise<UserProfileResponseProps> =>
    apiRequest({ url: '/api/user/profile' }),

  updateProfile: (
    data: UserProps,
    slug?: string,
  ): FetchResponse<{ subject: UserProps }> =>
    apiRequest({
      data,
      method: 'PATCH',
      url: concatUrlSlug('/api/auth/update', slug),
    }),

  view: (slug?: string | string[]): FetchResponse<UserProps> =>
    apiRequest({ url: concatUrlSlug('/user', slug) }),
};
