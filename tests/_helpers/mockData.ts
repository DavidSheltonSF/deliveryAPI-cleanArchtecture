import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { User as UserData } from '../../src/domain/entities/user';
import { mongoHelper } from '../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { UserRole } from '../../src/domain/entities/validators/_enums';

export class MockData {

  static generateHexId(): string {
    return uuidv4().replace(/-/g, "").slice(0, 24);
  }

  static mockUser(): UserData {

  return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      username: faker.person.firstName(),
      email: faker.internet.email(),
      cpf: faker.string.numeric({length: 11}),
      phone: faker.string.numeric({length: 11}),
      role: faker.helpers.enumValue(UserRole),
      address: {
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode('########')
      },
      authentication: {
        password: faker.internet.password({length: 8})
      },
    }
  }
}