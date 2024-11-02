import {
  DefaultApiResponse,
  FetchPaginationRequest,
  FetchPaginationResponse,
  FetchResponse,
  FetchSlug,
} from '../global.ts';

export interface PartnersListRequestProps {
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

export interface PartnersListResponseProps {
  createdAt: number;
  created_at: number;
  email: string;
  fio: string;
  id: string;
  phone: number;
  user_id: number;
}

export interface CreatePartnerPostProps {
  email: string;
  phone: number;
  cityId?: number;
  countryId?: number;
  fio?: string;
  type?: string;
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

export type PartnerViewResponse = Partial<{
  cityId: number;
  cityName: string;
  countryId: number;
  countryName: string;
  createdAt: number;
  email: string;
  fio: string;
  id: 1;
  phone: number;
  userId: string;
}>;

export interface CreatePartner {
  params: CreatePartnerPostProps;
  response: DefaultApiResponse;
}

export interface EditPartner {
  request: {
    data: EditPartnerPostProps;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export interface PartnerList {
  params: FetchPaginationRequest<PartnersListRequestProps>;
  response: FetchPaginationResponse<PartnersListResponseProps>;
}

export interface PartnerView {
  id: FetchSlug;
  response: FetchResponse<PartnerViewResponse>;
}
