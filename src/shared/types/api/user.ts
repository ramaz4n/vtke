import { FetchPaginationRequest, FetchPaginationResponse } from '../global.ts';

export interface UsersListParamsProps {
  email?: string;
  username?: string;
}

export interface UserProps {
  createdAt: string;
  created_at: number;
  email: string;
  files: UserFileProps[];
  id: number;
  status: 0 | 9 | 10;
  statusText: string;
  username: string;
}

export type UserFileProps = {
  createdAt: string;
  created_at: number;
  id: number;
  name: string;
};

export interface CreateUserPostProps {
  email: string;
  phone: number;
  fio?: string;
  type?: string;
}

export interface FetchUserList {
  request: FetchPaginationRequest<UsersListParamsProps>;
  response: FetchPaginationResponse<UserProps>;
}
