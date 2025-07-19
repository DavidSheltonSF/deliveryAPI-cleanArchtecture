import { Address } from '../entities/address/Address';
import { AddressProps } from '../entities/address/AddressProps';

export class AddressFactory {
  static create(addressProps: AddressProps): Address {
    const { street, city, state, zipCode } = addressProps;

    const addressEntity = new Address(street, city, state, zipCode);

    return addressEntity;
  }
}
