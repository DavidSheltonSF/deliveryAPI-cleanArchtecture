import { AddressDTO } from "./AddressDTO";

export interface DriverDTO {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  role: string;
  vehicleType: string;
  licensePlace: string;
  password: string;
  address: AddressDTO;
}
