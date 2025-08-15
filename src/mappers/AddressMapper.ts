import { AddressProps } from '../domain/entities/props/AddressProps';
import { AddressModel } from '../infrastructure/models/mongodb/AddressModel';

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
}
