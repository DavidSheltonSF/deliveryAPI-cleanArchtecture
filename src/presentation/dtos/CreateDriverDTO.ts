import { AddressDTO } from './AddressDTO';
import { AuthenticationDTO } from './AuthenticationDTO';
import { UserDTO } from './UserDTO';

export interface CreateCustomerDTO {
  user: UserDTO;
  address?: AddressDTO;
  authentication: AuthenticationDTO;
}
