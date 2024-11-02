import { FetchPaginationRequest, FetchPaginationResponse } from '../global.ts';
import { Partner } from './contract.ts';
import { Institution } from './institution.ts';

export interface PromocodeProps {
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

export type PromocodeListRequest = FetchPaginationRequest<
  Partial<PromocodeProps>
>;

export type PromocodeListResponse = FetchPaginationResponse<PromocodeProps>;

export type PromocodeCreateRequest = {
  amount: number;
  code: string;
  count: number;
  finish: number;
  institutionId: number;
  partnerId: number;
  start: number;
};
