import { apiRequest } from '@/shared/api/api-request.ts';
import {
  AuthLoginProps,
  AuthLoginResponse,
  AuthRegisterProps,
  AuthRegisterResponse,
} from '@/shared/types/api/auth.ts';

export const authApi = {
  login: (data: AuthLoginProps): Promise<AuthLoginResponse> =>
    apiRequest({ data, method: 'POST', url: '/api/auth/login' }),

  logout: (): Promise<boolean> =>
    apiRequest({ method: 'POST', url: '/api/auth/logout' }),

  refresh: (): Promise<AuthLoginResponse> =>
    apiRequest({ method: 'POST', url: '/api/auth/refresh' }),

  register: (data: AuthRegisterProps): Promise<AuthRegisterResponse> =>
    apiRequest({ data, method: 'POST', url: '/api/auth/register' }),
};
