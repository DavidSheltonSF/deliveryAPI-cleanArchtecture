import { UserRole } from "../../_enums";
import { Cpf, Email, Name, Password, Phone } from "../../value-objects";
import { AddressProps } from "./AddressProps";

export interface DriverProps {
  firstName: Name;
  lastName: Name;
  email: Email;
  cpf: Cpf;
  phone: Phone;
  role: UserRole;
  vehicleType: string;
  licensePlace: string;
  address: AddressProps
  passwordHash: Password;
}
