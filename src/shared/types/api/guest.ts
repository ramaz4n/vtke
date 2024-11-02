import { FetchPaginationResponse, PaginationRequestProps } from '../global.ts';

export interface GuestProps {
  createdAt: string;
  created_at: number;
  id: number;
  name: string;
  surname: string;
  user_id: string;
}

export interface GuestList {
  params: PaginationRequestProps;
  response: FetchPaginationResponse<GuestProps>;
}
