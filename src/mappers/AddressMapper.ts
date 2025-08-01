import { AddressResponseDTO } from '../application/useCaseDtos/AddressResponseDTO';
import { AddressProps } from '../domain/entities/props/AddressProps';
import { addressErrorType } from '../domain/errors/errorTypes';
import { AddressZipCode } from '../domain/value-objects';
import { AddressModel } from '../infrastructure/models/mongodb/AddressModel';
import { AddressDTO } from '../presentation/dtos/AddressDTO';
import { Either } from '../shared/either';

export class AddressMapper {
  static rawToProps(
    addressDTO: AddressDTO
  ): Either<addressErrorType, AddressProps> {
    const { street, city, state, zipCode } = addressDTO;

    const zipCodeOrError = AddressZipCode.create(zipCode);
    if (zipCodeOrError.isLeft()) {
      return Either.left(zipCodeOrError.getLeft());
    }

    const addressProps = {
      street: street,
      city: city,
      state: state,
      zipCode: zipCodeOrError.getRight(),
    };

    return Either.right(addressProps);
  }

  static modelToResponseDTO(addressModel: AddressModel): AddressResponseDTO {
    const { street, city, state, zipCode } = addressModel;

    const addressResponse = {
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
    };

    return addressResponse;
  }
}
