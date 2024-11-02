/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

import { FormValidator } from '../utils/form-validator.ts';

export type FetchSlug = string | undefined;

export type ServerFile = {
  file_id: number;
  id: number;
  name: string;
  publicLink: string;
};

export interface UseFetchListProps<T = undefined> {
  queryKey: string;
  params?: T extends undefined
    ? PaginationRequestProps
    : FetchPaginationRequest<T>;
}
export interface UseFetchViewProps {
  queryKey: string;
  id?: string;
}

export interface FormElementsProps<Name extends FieldValues, Value> {
  name: FieldPath<Name>;
  handleChange?: (name: FieldPath<Name>, value: Value) => void;
  rules?: FormValidator | RegisterOptions;
}

export type FetchPaginationRequest<T> = PaginationRequestProps & T;

export type DefaultType<I, T = undefined> = T extends undefined ? I : T;

export interface PaginationRequestProps {
  limit?: number;
  page?: number;
  sort?: string;
}

export type FetchResponse<T> = Promise<ApiResponse<T>>;

export type FetchPaginationResponse<Model> = Promise<
  ApiPaginationResponse<Model>
>;

export interface ApiResponse<T> {
  data: T;
  error: boolean;
  status: number;
}

export type DefaultApiResponse = FetchResponse<string>;

export type AnyObjectType = Record<string, any>;

export type ApiPaginationResponse<Model> = ApiResponse<{
  countRecord: number;
  lastPage: number;
  models: Model[];
}>;

export type ApiValidationError = Record<string, string[]> | string;
