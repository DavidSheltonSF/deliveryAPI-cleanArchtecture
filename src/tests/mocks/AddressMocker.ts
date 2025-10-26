import { faker } from '@faker-js/faker';
import { AddressDTO } from '../../presentation/dtos/AddressDTO';
import { WithId } from '../../utils/types/WithId';
import { AddressProps } from '../../domain/entities/props/AddressProps';
import { AddressZipCode } from '../../domain/value-objects';

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

  static mockAddressProps(): AddressProps {
    const addressProps: AddressProps = {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: AddressZipCode.createFromPersistence(
        faker.location.zipCode('########')
      ),
    };

    return addressProps;
  }

  static mockAddressPropsWithId(): WithId<AddressProps> {
    const addressProps: WithId<AddressProps> = {
      id: 'dfdafdsafa',
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: AddressZipCode.createFromPersistence(
        faker.location.zipCode('########')
      ),
    };

    return addressProps;
  }
}
