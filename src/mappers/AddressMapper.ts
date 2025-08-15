import { AddressResponseDTO } from '../application/useCaseDtos/AddressResponseDTO';
import { AddressProps } from '../domain/entities/props/AddressProps';
import { AddressModel } from '../infrastructure/models/mongodb/AddressModel';
import { WithId } from '../utils/types/WithId';

export class AddressMapper {
  static propsToPersistence(address: AddressProps): AddressModel {
    const { userId, street, city, state, zipCode } = address;

    return {
      userId,
      street,
      city,
      state,
      zipCode: zipCode.getValue(),
      createdAt: new Date(),
    };
  }

  static toResponse(address: WithId<AddressProps>): AddressResponseDTO {
    const { userId, street, city, state, zipCode } = address;

    return {
      street,
      city,
      state,
      zipCode: zipCode.getValue(),
    };
  }
}
