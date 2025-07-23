import { AddressDTO } from '../../presentation/dtos/AddressDTO';
import { Either } from '../../shared/either';
import { Address } from '../entities/address/Address';
import { addressErrorType } from '../errors/errorTypes';
import { validateAddress } from '../helpers/validateAddress';

export class AddressFactory {
  static create(addressDTO: AddressDTO): Either<addressErrorType, Address> {
    const addressOrError = validateAddress(addressDTO);

    if (addressOrError.isLeft()) {
      return Either.left(addressOrError.getLeft());
    }

    const validValues = addressOrError.getRight();

    const addressEntity = new Address(
      validValues.get('street').getValue(),
      validValues.get('city').getValue(),
      validValues.get('state').getValue(),
      validValues.get('zipCode').getValue()
    );

    return Either.right(addressEntity);
  }
}
