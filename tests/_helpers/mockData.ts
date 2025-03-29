import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { User} from '../../src/domain/entities/user';
import { RestaurantChain } from '../../src/domain/entities/restaurantChain';
import { mongoHelper } from '../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { UserRole } from '../../src/domain/entities/validators/_enums';


export class MockData {

  static generateHexId(): string {
    return uuidv4().replace(/-/g, "").slice(0, 24);
  }

  static mockUser(): User {

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

  static mockRestaurantChain(): RestaurantChain {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      name: faker.company.name(),
      cnpj: faker.string.numeric({length: 11}),
      iconUrl: faker.image.url(),
      adminId: this.generateHexId(),
    };
  }
}