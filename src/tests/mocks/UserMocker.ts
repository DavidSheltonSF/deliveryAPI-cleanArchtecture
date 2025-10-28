import { faker } from '@faker-js/faker';
import { UserRole } from '../../domain/_enums';
import { WithId } from '../../utils/types/WithId';
import { UserProps } from '../../domain/entities/props/UserProps';
import { Email, Name, Password } from '../../domain/value-objects';

export class UserMocker {
  static mockUserProps(): UserProps {
    const userProps = {
      firstName: Name.createFromPersistence(faker.person.firstName()),
      lastName: Name.createFromPersistence(faker.person.lastName()),
      email: Email.createFromPersistence(faker.internet.email()),
      role: faker.helpers.enumValue(UserRole),
      passwordHash: Password.createFromPersistence('fakeHas4$$%@$2hemkqmrkq'),
    };

    return userProps;
  }

  static mockUserPropsWithId(): WithId<UserProps> {
    const userProps = {
      id: 'mfakdsnfasnkfjdnskfma-fake',
      firstName: Name.createFromPersistence(faker.person.firstName()),
      lastName: Name.createFromPersistence(faker.person.lastName()),
      email: Email.createFromPersistence(faker.internet.email()),
      role: faker.helpers.enumValue(UserRole),
      passwordHash: Password.createFromPersistence('fakeHas4$$%@$2hemkqmrkq'),
    };

    return userProps;
  }
}
