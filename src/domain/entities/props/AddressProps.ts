import { AddressZipCode } from '../../value-objects';

export interface AddressProps {
  userId?: string;
  street: string;
  city: string;
  state: string;
  zipCode: AddressZipCode;
}
