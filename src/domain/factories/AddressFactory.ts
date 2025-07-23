import { AddressDTO } from '../../presentation/dtos/AddressDTO';
import { Either } from '../../shared/either';
import { Address } from '../entities/address/Address';
import { addressErrorType } from '../errors/errorTypes';
import { AddressZipCode } from '../value-objects';
import { AddressCity } from '../value-objects/AddressCity';
import { AddressState } from '../value-objects/AddressState';
import { AddressStreet } from '../value-objects/AddressStreet';
import { ValueObject } from '../value-objects/ValueObject';

export class AddressFactory {
  static create(addressDTO: AddressDTO): Either<addressErrorType, Address> {
    const { street, city, state, zipCode } = addressDTO;

    const validations = {
      street: AddressStreet.create(street),
      city: AddressCity.create(city),
      state: AddressState.create(state),
      zipCode: AddressZipCode.create(zipCode),
    };

    const validValues: Map<string, ValueObject> = new Map();

    for (const [k, v] of Object.entries(validations)) {
      if (v.isLeft()) {
        return Either.left(v.getLeft());
      }
      validValues.set(k, v.getRight());
    }

    const addressEntity = new Address(
      validValues.get('street').getValue(),
      validValues.get('city').getValue(),
      validValues.get('state').getValue(),
      validValues.get('zipCode').getValue()
    );

    return Either.right(addressEntity);
  }
}
