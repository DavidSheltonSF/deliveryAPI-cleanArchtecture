import { AddressDTO } from './AddressDTO';
import { AuthenticationDTO } from './AuthenticationDTO';
import { DriverFieldsDTO } from './DriverFieldsDTO';
import { UserDTO } from './UserDTO';

export interface CreateAdminDTO {
  user: UserDTO;
  authentication: AuthenticationDTO;
}
