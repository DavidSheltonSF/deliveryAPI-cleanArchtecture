import { AddressProps, Birthday, Cpf, Email, Name, Phone, Role, UserName } from '../../value-objects';
import { HashedPassword } from '../../value-objects';
import { BankAccountProps } from '../bankAccount/BankAccountProps';

export interface AuthenticationProps {
  hashedPassword: HashedPassword;
  sessionToken?: string;
}

export interface UserProps {
  username: UserName;
  name: Name;
  email: Email;
  cpf: Cpf;
  phone?: Phone;
  birthday?: Birthday;
  role: Role;
  address?: AddressProps;
  bankAccount: BankAccountProps;
  authentication: AuthenticationProps;
}


  