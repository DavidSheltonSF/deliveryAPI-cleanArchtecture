import { AddressDTO } from '../../presentation/dtos/AddressDTO';
import { Either } from '../../shared/either';
import { AddressProps } from '../entities/props/AddressProps';
import { addressErrorType } from '../errors/errorTypes';
import { AddressZipCode } from '../value-objects';
import { AddressCity } from '../value-objects/AddressCity';
import { AddressState } from '../value-objects/AddressState';
import { AddressStreet } from '../value-objects/AddressStreet';
import { ValueObject } from '../value-objects/ValueObject';
import { validateEitherValues } from './validateEitherValues';

export function validateAddress(
  addressDTO: AddressDTO
): Either<addressErrorType, AddressProps> {
  const { street, city, state, zipCode } = addressDTO;

  const validations = {
    street: AddressStreet.create(street),
    city: AddressCity.create(city),
    state: AddressState.create(state),
    zipCode: AddressZipCode.create(zipCode),
  };

  const validValuesOrError = validateEitherValues(validations);

  if (validValuesOrError.isLeft()) {
    return Either.left(validValuesOrError.getLeft());
  }

  const validValues = validValuesOrError.getRight();

  const addressProps = {
    street: validValues.get('street') as AddressStreet,
    city: validValues.get('city') as AddressCity,
    state: validValues.get('state') as AddressState,
    zipCode: validValues.get('zipCode') as AddressZipCode,
  };

  return Either.right(addressProps);
}
