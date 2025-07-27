import { Address } from '../Address';
import { Authentication } from '../Authentication';
import { BankAccount } from '../BankAccount';

export interface UserProps {
  id: string;
  username: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: string;
  birthday: Date;
  addresss?: Address;
  bankAccount?: BankAccount;
  authentication: Authentication;
}
