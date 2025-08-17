import { AddressDTO } from './AddressDTO';
import { UserDTO } from './UserDTO';

export interface CreateCustomerDTO {
  user: UserDTO;
  address?: AddressDTO;
}
