import { addressErrorType } from '../../domain/errors/errorTypes';
import { AddressDTO } from '../../presentation/dtos/AddressDTO';
import { Either } from '../../shared/either';
import { FieldsValidator } from './FieldsValidator';

export function validateAddress(
  address: AddressDTO
): Either<addressErrorType, null> {
  const { street, city, state, zipCode } = address;

  const validation = FieldsValidator.validateFields({
    street,
    city,
    state,
    zipCode,
  });
  if (validation.isLeft()) {
    return Either.left(validation.getLeft());
  }

  return null;
}
