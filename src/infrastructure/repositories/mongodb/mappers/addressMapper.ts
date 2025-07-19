import { AddressProps } from '../../../../domain/entities/address/AddressProps';
import { InvalidAddressError } from '../../../../domain/errors';
import { InvalidZipCodeError } from '../../../../domain/errors/InvalidZipCodeError';
import { ZipCode } from '../../../../domain/value-objects';
import { AddressDTO } from '../../../../presentation/dtos/UserDTO';
import { Either } from '../../../../shared/either';

export function rawAddressToProps(
  addressDTO: AddressDTO
): Either<InvalidZipCodeError | InvalidAddressError, AddressProps> {
  const zipCodeOrError = ZipCode.create(addressDTO.zipCode);

  const { street, city, state } = addressDTO;

  if (zipCodeOrError.isLeft()) {
    return Either.left(zipCodeOrError.getLeft());
  }

  const validZipCode = zipCodeOrError.getRight();
  const addressProps = {
    street: street,
    city: city,
    state: state,
    zipCode: validZipCode,
  };
  return Either.right(addressProps);
}
