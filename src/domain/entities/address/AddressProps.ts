import { ZipCode } from '../../value-objects/ZipCode';

export interface AddressProps {
  street: string;
  city: string;
  state: string;
  zipCode: ZipCode;
}
