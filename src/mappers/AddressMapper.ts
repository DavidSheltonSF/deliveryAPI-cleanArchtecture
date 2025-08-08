import { Document, WithId } from 'mongodb';
import { AddressResponseDTO } from '../application/useCaseDtos/AddressResponseDTO';
import { AddressProps } from '../domain/entities/props/AddressProps';
import { addressErrorType } from '../domain/errors/errorTypes';
import { AddressZipCode } from '../domain/value-objects';
import { AddressModel } from '../infrastructure/models/mongodb/AddressModel';
import { AddressDTO } from '../presentation/dtos/AddressDTO';
import { Either } from '../shared/either';
import { Address } from '../domain/entities/Address';

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

  static persistenceToModel(document: WithId<Document>): AddressModel | null {
    if (document === null) {
      return null
    }

    return {
      _id: document._id.toString(),
      userId: document.userId.toString(),
      street: document.street,
      city: document.city,
      state: document.state,
      zipCode: document.zipCode,
      createdAt: document.createdAt,
    };
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

  static entityToModel(address: Address): AddressModel {
    if (address === null) {
      throw Error('No entity provided.');
    }

    return {
      _id: address.id,
      userId: address.userId,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      createdAt: address.createdAt,
    };
  }
}
