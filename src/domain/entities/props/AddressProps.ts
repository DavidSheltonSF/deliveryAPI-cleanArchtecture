import { AddressZipCode } from '../../value-objects';
import { AddressCity } from '../../value-objects/AddressCity';
import { AddressState } from '../../value-objects/AddressState';
import { AddressStreet } from '../../value-objects/AddressStreet';

export interface AddressProps {
  street: AddressStreet;
  city: AddressCity;
  state: AddressState;
  zipCode: AddressZipCode;
}
