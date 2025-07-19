import {
  Birthday,
  Cpf,
  Email,
  Name,
  Phone,
  Role,
  UserName,
} from '../../value-objects';
import { AddressProps } from '../address/AddressProps';
import { AuthenticationProps } from '../authentication/AuthenticationProps';
import { BankAccount } from '../bankAccount/BankAccount';

export interface UserProps {
  id?: string;
  username: UserName;
  name: Name;
  email: Email;
  cpf: Cpf;
  phone: Phone;
  role: Role;
  birthday: Birthday;
  address?: AddressProps;
  bankAccount?: BankAccount;
  authentication: AuthenticationProps;
}
