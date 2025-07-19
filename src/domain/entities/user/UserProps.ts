import { AddressProps } from '../address/AddressProps';
import { AuthenticationProps } from '../authentication/AuthenticationProps';
import { BankAccountProps } from '../bankAccount/BankAccountProps';

export interface UserProps {
  id?: string;
  username: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: string;
  birthday: Date;
  address?: AddressProps;
  bankAccount?: BankAccountProps;
  authentication: AuthenticationProps;
}
