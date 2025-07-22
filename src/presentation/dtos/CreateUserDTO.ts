import { AddressDTO } from './AddressDTO';
import { AuthenticationDTO } from './AuthenticationDTO';
import { BankAccountDTO } from './BankAccountDTO';

export interface CreateUserDTO {
  username: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthday: string;
  role: string;
  address?: AddressDTO;
  bankAccount?: BankAccountDTO;
  authentication: AuthenticationDTO;
}
