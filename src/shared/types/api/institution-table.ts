import {
  DefaultApiResponse,
  FetchPaginationRequest,
  FetchPaginationResponse,
  FetchResponse,
  FetchSlug,
  ServerFile,
} from '../global.ts';
import { Institution } from './institution.ts';
import { TagProps } from './tags.ts';

export interface InstitutionTableProps {
  active: number;
  createdAt: number;
  description: string;
  id: number;
  images: ServerFile[];
  institution: Institution;
  location: string;
  number: string;
  seatsFrom: number;
  seatsTo: number;
  status: number;
  tags: { id: number; tag: TagProps }[];
  updatedAt: number;
}

export interface InstitutionTableList {
  request: FetchPaginationRequest<
    Partial<InstitutionTableProps & { institutionId?: string }>
  >;
  response: FetchPaginationResponse<InstitutionTableProps>;
}

export type CreateInstitutionPost = Partial<{
  active: number;
  description: string;
  images: File[];
  institutionId: string;
  location: string;
  number: string;
  seatsFrom: number;
  seatsTo: number;
  status: number;
  tags: Array<{ id: number }>;
}>;

export type EditInstitutionPost = CreateInstitutionPost;

export interface CreateInstitutionTableProps {
  data: CreateInstitutionPost;
  response: DefaultApiResponse;
}

export interface EditInstitutionTable {
  request: {
    data: EditInstitutionPost;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export interface InstitutionTableView {
  id: FetchSlug;
  response: FetchResponse<InstitutionTableProps>;
}
