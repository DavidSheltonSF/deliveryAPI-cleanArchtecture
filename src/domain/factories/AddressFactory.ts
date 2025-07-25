import { AddressDTO } from '../../presentation/dtos/AddressDTO';
import { Either } from '../../shared/either';
import { Address } from '../entities/Address';
import { addressErrorType } from '../errors/errorTypes';

export class AddressFactory {
  static create(addressDTO: AddressDTO): Address {
    const { street, city, state, zipCode } = addressDTO;
    const addressEntity = new Address(street, city, state, zipCode);

    return addressEntity;
  }
}
