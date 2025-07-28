import { AddressResponseDTO } from './AddressResponseDTO';
import { UserResponseDTO } from './UserResponseDTO';

export type CreateCustomerResponseDTO = UserResponseDTO & AddressResponseDTO;
