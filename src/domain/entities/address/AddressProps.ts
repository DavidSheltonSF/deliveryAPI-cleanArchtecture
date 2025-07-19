import { ZipCode } from '../../value-objects/ZipCode';

export interface AddressProps {
  id?: string
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
