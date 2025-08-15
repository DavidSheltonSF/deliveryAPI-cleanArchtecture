import { WithId } from '../utils/types/WithId';
import { AddressProps } from '../domain/entities/props/AddressProps';
import { addressErrorType } from '../domain/errors/errorTypes';
import { AddressZipCode } from '../domain/value-objects';
import { AddressModel } from '../infrastructure/models/mongodb/AddressModel';
import { AddressDTO } from '../presentation/dtos/AddressDTO';
import { Either } from '../shared/either';

export class AddressFactory {
  static create(
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

  static createFromPersistence(
    data: WithId<AddressModel>
  ): WithId<AddressProps> {
    const { id, userId, street, city, state, zipCode } = data;

    const address = {
      id,
      userId,
      street,
      city,
      state,
      zipCode: AddressZipCode.createFromPersistence(zipCode),
    };

    return address;
  }
}
