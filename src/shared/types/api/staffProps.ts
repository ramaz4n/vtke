import {
  DefaultApiResponse,
  FetchPaginationRequest,
  FetchPaginationResponse,
  FetchResponse,
  FetchSlug,
} from '../global.ts';
import { UserProps } from './user.ts';

export interface StaffProps extends UserProps {
  fio: string;
}

export interface StaffListRequestProps {
  cityId?: number;
  countryId?: number;
  createdAt?: number;
  created_at?: number;
  email?: string;
  fio?: string;
  fullStringSearch?: string;
  id?: number;
  phone?: number;
  userId?: number;
}

export interface CreateStaffPostProps {
  username: string;
}

export type EditPartnerPostProps = Partial<{
  about: string;
  cityId: number;
  countryId: number;
  departmentCode: string;
  email: string;
  fillingStatus: number;
  fio: string;
  issuedWho: string;
  loyalty: number;
  passportNumber: number;
  passportSeries: number;
  phone: string;
  registrationAddress: string;
  type: string;
}>;

export type StaffViewResponse = Partial<{
  createdAt: number;
  created_at: number;
  email: string;
  fio: string;
  id: string;
  phone: number;
  user_id: number;
}>;

export interface CreateStaff {
  params: CreateStaffPostProps;
  response: DefaultApiResponse;
}

export interface EditStaff {
  request: {
    data: EditPartnerPostProps;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export interface StaffList {
  params: FetchPaginationRequest<StaffListRequestProps>;
  response: FetchPaginationResponse<StaffProps>;
}

export interface StaffView {
  id: FetchSlug;
  response: FetchResponse<StaffViewResponse>;
}
