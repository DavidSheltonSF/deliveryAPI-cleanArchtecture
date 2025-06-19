import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { UserProps } from '../../src/domain/entities/user-props';
import { UserRole } from '../../src/domain/entities/validation/_enums';

export class MockData {

  static generateHexId(): string {
    return uuidv4().replace(/-/g, "").slice(0, 24);
  }

  static mockUser(count: number = 1): UserProps[] {
    const mockedUsers: UserProps[] = [];
    for (let i = 0; i < count; i++) {
      const user = {
        id: this.generateHexId(),
        username: faker.person.firstName(),
        email: faker.internet.email(),
        cpf: faker.string.numeric({ length: 11 }),
        phone: faker.string.numeric({ length: 11 }),
        role: faker.helpers.enumValue(UserRole),
        address: {
          street: faker.location.street(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode('########')
        },
        authentication: {
          password: 'Senh4**Corret4'
        },
      };
      mockedUsers.push(user);
    }
    return mockedUsers;
  }

}