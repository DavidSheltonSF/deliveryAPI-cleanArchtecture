import { Either } from '../../shared/either';
import { AddressProps } from '../entities/props/AddressProps';
import { RawAddressProps } from '../entities/rawProps/RawAddressProps';
import { addressErrorType } from '../errors/errorTypes';
import { AddressZipCode } from '../value-objects';

export function buildAddressProps(
  authData: RawAddressProps
): Either<addressErrorType, AddressProps> {
  const { street, city, state, zipCode } = authData;

  const zipCodeOrError = AddressZipCode.create(zipCode);

  if (zipCodeOrError.isLeft()) {
    return Either.left(zipCodeOrError.getLeft());
  }

  const addressProps = {
    street,
    city,
    state,
    zipCode: zipCodeOrError.getRight(),
  };

  return Either.right(addressProps);
}
