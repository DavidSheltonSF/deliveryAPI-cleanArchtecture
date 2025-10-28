import { AddressResponseDTO } from "./AddressResponseDTO";

export interface CustomerResponseDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  birthday: string;
  address: AddressResponseDTO;
  createdAt: string;
}
