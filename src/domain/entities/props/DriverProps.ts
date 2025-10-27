import { Cpf, Phone } from "../../value-objects";

export interface DriverProps {
  cpf: Cpf;
  phone: Phone;
  vehicleType: string;
  licensePlace: string;
}
