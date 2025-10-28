import { Cpf, Phone } from "../../value-objects";

export interface DriverProps {
  userId: string;
  cpf: Cpf;
  phone: Phone;
  vehicleType: string;
  licensePlace: string;
}
