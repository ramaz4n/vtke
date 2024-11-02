import { LOGOUT_STORAGE_KEYS } from '../constants/logout-storage-keys.ts';
import { AnyObjectType } from '../types/global.ts';
import { parseApiUrl } from '../utils/parse-api-url.ts';

export interface ApiRequestProps extends Omit<RequestInit, 'body'> {
  url: string;
  data?: unknown;
  params?: AnyObjectType;
  slug?: string;
}

export const BASE_URL = process.env.VTKE_API_URL;

export const apiRequest = async ({
  url,
  params,
  headers,
  data,
  slug,
  ...options
}: ApiRequestProps) => {
  try {
    const authToken = window.localStorage.getItem('authToken');
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

    const resJson = await response.json();

    if (resJson.status === 403) {
      // window.location.replace(LINKS.error403);
      return;
    }

    if (resJson.status === 401) {
      for (const key of LOGOUT_STORAGE_KEYS) {
        localStorage.removeItem(key);
      }
      window.location.reload();

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
    // eslint-disable-next-line no-console
    // console.error(error);
    //
    // const errorMessage = String(error);
    //
    // if (process.env.DEV) {
    //   showToast({
    //     errorMessage: errorMessage,
    //     message: 'Ошибка API запроса' + url,
    //     options: { duration: 6000 },
    //     type: 'error',
    //   });
    // }
  }
};
