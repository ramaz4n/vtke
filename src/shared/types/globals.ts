import type { Ref } from 'react';

export type NonNullableKeys<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type Default<
  Initial,
  Alternative = undefined,
> = Alternative extends undefined ? Initial : Alternative;

export type ForwardComponent<Element, Props> = Props & {
  forwardedRef?: Ref<Element>;
};

export type Slot<U extends string> = Partial<
  Record<U, HTMLElement['className']>
>;

export type IdModel = { id?: string | number };
export type FetchResponse<T> = Promise<ApiResponse<T>>;

export type FetchPaginationResponse<T> = Promise<PaginationApiResponse<T>>;

export type PaginationRequest<T> = Partial<T> & {
  limit?: number;
  page?: number;
  sort?: string;
};

export type ApiResponse<T> = T & {
  message: string;
  errors?: Record<string, string[]>;
};

export interface PaginationApiResponse<T> {
  data: T;
  pagination: {
    last_page: number;
    per_page: number;
    total: number;
  };
}

export type ApiValidationError = Record<string, string[]> | string;

export type ServerPageProps<T extends string | undefined = undefined> = {
  params: Promise<Record<T extends string ? T : 'id' | 'slug', string>>;
};

export type ServerMetadataGenerate<T extends string | undefined = undefined> = {
  params: Record<T extends string ? T : 'id' | 'slug', string>;
};
