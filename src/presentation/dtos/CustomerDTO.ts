import { AddressDTO } from "./AddressDTO";

export interface CustomerDTO {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  phone: string;
  birthday: string;
  role: string;
  password: string;
  address: AddressDTO;
}
