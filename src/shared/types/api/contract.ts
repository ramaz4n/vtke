import {
  DefaultApiResponse,
  FetchPaginationRequest,
  FetchPaginationResponse,
  FetchResponse,
  FetchSlug,
  ServerFile,
} from '../global.ts';

export interface Partner {
  cityId: number;
  cityName: string;
  countryId: number;
  countryName: string;
  createdAt: number;
  email: string;
  fio: string;
  id: number;
  phone: number;
  userId: string;
}
export interface Contract {
  bank: string;
  bik: string;
  cityId: string;
  companyManager: string;
  correspondentAccount: string;
  countryId: string;
  createdAt: number;
  director: string;
  documents: ServerFile[];
  formOrganization: number;
  formatInstitution: string;
  id: number;
  inn: string;
  kpp: string;
  nameOrganization: string;
  ogrn: string;
  partner: Partner;
  paymentAccount: string;
  saleManager: string;
  typeInstitution: string;
}

export type ContractListRequest = Partial<{
  bank: string;
  bik: string;
  cityId: number;
  companyManager: string;
  correspondentAccount: string;
  countryId: number;
  director: string;
  formOrganization: number;
  formatInstitution: string;
  inn: string;
  kpp: string;
  nameOrganization: string;
  ogrn: string;
  partnerId: number;
  paymentAccount: string;
  saleManager: string;
  typeInstitution: string;
}>;

export interface ContractList {
  request: FetchPaginationRequest<ContractListRequest>;
  response: FetchPaginationResponse<Contract>;
}

export type CreateContractPostProps = Partial<{
  bank: string;
  bik: string;
  cityId: string;
  companyManager: string;
  correspondentAccount: string;
  countryId: string;
  director: string;
  formOrganization: number;
  formatInstitution: string;
  inn: string;
  kpp: string;
  nameOrganization: string;
  ogrn: string;
  partnerId: number;
  paymentAccount: string;
  saleManager: string;
  typeInstitution: string;
}>;

export interface CreateContract {
  data: CreateContractPostProps;
  response: DefaultApiResponse;
}

export type EditContractPostProps = Partial<{
  bank: string;
  bik: string;
  cityId: string;
  companyManager: string;
  correspondentAccount: string;
  countryId: string;
  director: string;
  formOrganization: number;
  formatInstitution: string;
  inn: string;
  kpp: string;
  nameOrganization: string;
  ogrn: string;
  partnerId: number;
  paymentAccount: string;
  saleManager: string;
  typeInstitution: string;
}>;

export interface EditContract {
  request: {
    data: EditContractPostProps;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export interface ContractView {
  id: FetchSlug;
  response: FetchResponse<Contract>;
}
