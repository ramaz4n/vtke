import {
  DefaultApiResponse,
  FetchPaginationRequest,
  FetchPaginationResponse,
  FetchResponse,
  FetchSlug,
} from '../global.ts';
import { Partner } from './contract.ts';
import { Institution } from './institution.ts';

export interface PromoCode {
  amount: number;
  code: string;
  count: number;
  createdAt: number;
  finish: number;
  id: number;
  institution: Institution;
  partner: Partner;
  start: number;
  updatedAt: number;
}

export interface PromoCodesListRequestProps {
  createdAt?: number;
  created_at?: number;
  id?: number;
}

export interface PromoCodesListResponseProps {
  createdAt?: number;
  created_at?: number;
  id?: number;
}

export interface CreatePromoCodesProps {
  amount: number;
  code: string;
  count: number;
  finish: number;
  institutionId: number;
  partnerId: number;
  start: number;
}

export type EditPromoCodesProps = Partial<{
  createdAt?: number;
  created_at?: number;
  id?: number;
}>;

export type PromoCodesViewResponse = Partial<{
  createdAt?: number;
  created_at?: number;
  id?: number;
}>;

export interface CreatePromoCodes {
  data: CreatePromoCodesProps;
  response: DefaultApiResponse;
}

export interface EditPromoCodes {
  request: {
    data: EditPromoCodesProps;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export interface PromoCodesList {
  params: FetchPaginationRequest<PromoCodesListRequestProps>;
  response: FetchPaginationResponse<PromoCode>;
}

export interface PromoCodesView {
  id: FetchSlug;
  response: FetchResponse<PromoCodesViewResponse>;
}
