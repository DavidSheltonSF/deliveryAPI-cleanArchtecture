import { AddressDTO } from './AddressDTO';
import { DriverFieldsDTO } from './DriverFieldsDTO';
import { UserDTO } from './UserDTO';

export interface CreateDriverDTO {
  user: UserDTO;
  driverFields: DriverFieldsDTO
  address?: AddressDTO;
}
