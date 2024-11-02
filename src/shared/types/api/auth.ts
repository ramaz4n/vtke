import { FetchResponse } from '../global.ts';

export interface SignIn {
  postData: SignInRequestProps;
  response: FetchResponse<SignInResponseProps>;
}

export interface SignInConfirm {
  postData: SignInConfirmProps;
  response: FetchResponse<SignInConfirmResponseProps>;
}

interface SignInRequestProps {
  password: string;
  phone: string;
}

interface SignInResponseProps {
  access_token: string | null;
  seconds: string[];
  sendCode: boolean;
}
interface SignInConfirmProps {
  code: number;
  phone: string;
}
interface SignInConfirmResponseProps {
  access_token: string;
}
