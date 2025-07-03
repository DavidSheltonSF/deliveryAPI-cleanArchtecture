import { Birthday, Cpf, Email, Name, Phone, Role, UserName } from '../../value-objects';
import { HashedPassword } from '../../value-objects';
import { BankAccountProps } from '../bankAccount/BankAccountProps';
import { AddressProps } from '../address/AddressProps';

export interface AuthenticationProps {
  hashedPassword: HashedPassword;
  sessionToken?: string;
}

export interface UserProps {
  username: UserName;
  name: Name;
  email: Email;
  cpf: Cpf;
  phone: Phone;
  role: Role;
  birthday: Birthday;
  address?: AddressProps;
  bankAccount?: BankAccountProps;
  authentication: AuthenticationProps;
}


  