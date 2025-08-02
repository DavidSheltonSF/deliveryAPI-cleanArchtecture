import { faker } from '@faker-js/faker';
import { AddressDTO } from '../../presentation/dtos/AddressDTO';

export class AddressMocker {
  static mockAddressDTO(): AddressDTO {
    const AddressDTO: AddressDTO = {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode('########'),
    };

    return AddressDTO;
  }
}
