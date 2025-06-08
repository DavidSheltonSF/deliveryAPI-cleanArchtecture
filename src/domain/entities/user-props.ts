import {
  AddressProps,
  BankInfoProps,
  AuthenticationProps,
} from './validation/_interfaces';

export interface UserProps {
  _id?: string;
  username: string;
  email: string;
  cpf: string;
  phone: string;
  role: string;
  address?: AddressProps;
  authentication: AuthenticationProps;
  bankInfo?: BankInfoProps;
}
