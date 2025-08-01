import { AddressDTO } from './AddressDTO';
import { AuthenticationDTO } from './AuthenticationDTO';
import { BankAccountDTO } from './BankAccountDTO';
import { UserDTO } from './UserDTO';

export interface CreateUserDTO {
  user: UserDTO;
  address?: AddressDTO;
  bankAccount?: BankAccountDTO;
  authentication: AuthenticationDTO;
}
