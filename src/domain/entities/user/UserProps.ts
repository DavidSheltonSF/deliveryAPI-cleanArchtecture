import {
  Birthday,
  Cpf,
  Email,
  Name,
  Phone,
  Role,
  UserName,
} from '../../value-objects';
import { Address } from '../address/Address';
import { Authentication } from '../authentication/Authentication';

export interface UserProps {
  id?: string;
  username: UserName;
  name: Name;
  email: Email;
  cpf: Cpf;
  phone: Phone;
  role: Role;
  birthday: Birthday;
  authentication: Authentication;
}
