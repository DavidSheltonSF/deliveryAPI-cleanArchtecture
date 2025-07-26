import { Either } from '../../shared/either';
import { Address } from '../entities/Address';
import { AddressProps } from '../entities/props/AddressProps';
import { addressErrorType } from '../errors/errorTypes';

export class AddressFactory {
  static create(address: AddressProps): Address {
    const addressEntity = new Address(address);
    return addressEntity;
  }
}
