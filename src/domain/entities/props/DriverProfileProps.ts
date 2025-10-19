import { Cpf, Phone } from '../../value-objects';

export interface DriverProfileProps {
  cpf: Cpf;
  phone: Phone;
  vehicleType: string;
  licensePlace: string;
}
