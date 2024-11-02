import {
  DefaultApiResponse,
  FetchPaginationRequest,
  FetchPaginationResponse,
  FetchResponse,
  FetchSlug,
} from '../global.ts';
import { GuestProps } from './guest.ts';
import { Institution } from './institution.ts';
import { InstitutionTableProps } from './institution-table.ts';

export interface Booking {
  adminComment: string;
  createdAt: number;
  fio: string;
  guest: GuestProps;
  guestCount: string;
  guestName: string;
  guestPhone: string;
  id: number;
  institution: Institution;
  institutionTable: InstitutionTableProps;
  startedAt: number;
  status: string;
  table: string;
  time: number;
  updatedAt: number;
}

export type BookingListParams = Partial<{
  createdAt: number;
  fio: string;
  id: number;
  institution: Institution;
  status: string;
  table: string;
  time: number;
  updatedAt: number;
}>;

export interface BookingList {
  request: FetchPaginationRequest<BookingListParams>;
  response: FetchPaginationResponse<Booking>;
}

export type CreateBookingPost = Partial<{
  adminComment: string;
  date: number;
  guestComment: string;
  guestCount: number;
  guestId: number;
  guestName: string;
  guestPhone: string;
  institutionTableId: number;
  startedAt: number;
  status: number;
  institutionId?: number;
}>;

export type EditBookingPost = Partial<{
  fio: string;
  id: number;
  institution: Institution;
  table: string;
  time: number;
}>;

export interface CreateBooking {
  data: CreateBookingPost;
  response: DefaultApiResponse;
}

export interface EditBooking {
  request: {
    data: EditBookingPost;
    id: FetchSlug;
  };
  response: DefaultApiResponse;
}

export interface BookingView {
  id: FetchSlug;
  response: FetchResponse<Booking>;
}

export interface BookingFreeTablesProps {
  params: {
    guestCount: number;
    institutionId: number;
    startedAt: number;
  };
  response: FetchResponse<InstitutionTableProps>;
}
