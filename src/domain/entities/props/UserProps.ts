import {
  Birthday,
  Cpf,
  Email,
  Name,
  Phone,
  Role,
  UserName,
} from '../../value-objects';
import { AddressProps } from './AddressProps';
import { AuthenticationProps } from './AuthenticationProps';
import { BankAccountProps } from './BankAccountProps';

export interface UserProps {
  username: UserName;
  name: Name;
  email: Email;
  cpf: Cpf;
  phone: Phone;
  role: Role;
  birthday: Birthday;
  addresss?: AddressProps;
  bankAccount?: BankAccountProps;
  authentication: AuthenticationProps;
}
