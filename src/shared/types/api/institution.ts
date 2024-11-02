import {
  DefaultApiResponse,
  FetchPaginationRequest,
  FetchPaginationResponse,
  FetchResponse,
  FetchSlug,
  ServerFile,
} from '../global.ts';
import { Contract } from './contract.ts';

export interface Institution {
  accountingSystem: number;
  address: string;
  cityId: number;
  contract: Contract;
  countryId: number;
  createdAt: number;
  fioAdmin: string;
  fioManager: string;
  id: number;
  images: ServerFile[];
  name: string;
  phone: number;
  phoneAdmin: number;
  phoneManager: number;
  telegram: string;
  updatedAt: number;
  vk: string;
  whatsApp: number;
}

export type InstitutionListParams = Partial<{
  accountingSystem: number;
  address: string;
  cityId: number;
  contractId: number;
  countryId: number;
  fioAdmin: string;
  fioManager: string;
  name: string;
  phone: number;
  phoneAdmin: number;
  phoneManager: number;
  telegram: number;
  updatedAt: number;
  vk: string;
  whatsApp: number;
}>;

export interface InstitutionList {
  request: FetchPaginationRequest<InstitutionListParams>;
  response: FetchPaginationResponse<Institution>;
}

export type CreateInstitutionPost = Partial<{
  accountingSystem: number;
  address: string;
  cityId: number;
  contractId: number;
  countryId: number;
  fioAdmin: string;
  fioManager: string;
  name: string;
  phone: number;
  phoneAdmin: number;
  phoneManager: number;
  telegram: string;
  updatedAt: number;
  vk: string;
  whatsApp: number;
}>;

export type EditInstitutionPost = Partial<{
  accountingSystem: number;
  address: string;
  cityId: number;
  contractId: number;
  countryId: number;
  fioAdmin: string;
  fioManager: string;
  name: string;
  phone: number;
  phoneAdmin: number;
  phoneManager: number;
  telegram: string;
  updatedAt: number;
  vk: string;
  whatsApp: number;
}>;

export interface CreateInstitution {
  data: CreateInstitutionPost;
  response: DefaultApiResponse;
}

export interface EditInstitution {
  request: {
    data: EditInstitutionPost;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export interface InstitutionView {
  id: FetchSlug;
  response: FetchResponse<Institution>;
}
