import { UserProps } from '@/shared/types/api/user.ts';

export interface AuthLoginProps {
  email: string;
  password: string;
}

export interface AuthRegisterProps {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}

export interface AuthLoginResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  user: UserProps;
}

export interface AuthRegisterResponse {
  message: string;
  user: {
    created_at: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    phone: string;
    updated_at: string;
    username: string;
  };
}
