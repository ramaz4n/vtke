import { LOGOUT_STORAGE_KEYS } from '../constants/logout-storage-keys.ts';
import { parseApiUrl } from '../utils/parse-api-url.ts';

export interface ApiRequestProps extends Omit<RequestInit, 'body'> {
  url: string;
  data?: unknown;
  params?: unknown;
  slug?: string;
}

export enum HttpErrors {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Ok = 200,
  Validation = 422,
  InternalServerError = 500,
}

export const BASE_URL =
  process.env.NEXT_PUBLIC_VTKE_API_DEV || 'http://89.111.169.139:80';

export const apiRequest = async ({
  url,
  params,
  headers,
  data,
  slug,
  ...options
}: ApiRequestProps) => {
  try {
    let authToken: string | null = '';

    if (typeof window !== 'undefined') {
      authToken = window.localStorage.getItem('authToken');
    }
    const fullUrl = parseApiUrl(params, url, slug);

    const isFormData = data instanceof FormData;

    const body = isFormData ? data : JSON.stringify(data);

    const response = await fetch(fullUrl, {
      headers: {
        ...(authToken && {
          Authorization: `Bearer ${authToken}`,
        }),
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...headers,
      },
      ...((data && { body }) as Record<string, unknown>),
      ...options,
    });

    console.log(response, 'response');
    const resJson = await response.json();

    if (resJson.status === HttpErrors.Forbidden) {
      // window.location.replace(LINKS.error403);
      return;
    }

    if (resJson.status === HttpErrors.Unauthorized) {
      for (const key of LOGOUT_STORAGE_KEYS) {
        localStorage.removeItem(key);
      }
      // window.location.reload();

      return;
    }

    // if (!response.ok && response.status !== 406) {
    //   const errorText = resJson.data ? String(resJson.data) : '';
    //   const errorMessage = `Ошибка HTTP: ${response.status} ${errorText}`;
    //
    //   if (process.env.DEV) {
    //     showToast({
    //       errorMessage: errorMessage,
    //       message: 'Ошибка API запроса ' + url,
    //       options: { duration: 6000 },
    //       type: 'error',
    //     });
    //   }
    // }

    return resJson;
  } catch (error) {
    console.log(error);
  }
};
