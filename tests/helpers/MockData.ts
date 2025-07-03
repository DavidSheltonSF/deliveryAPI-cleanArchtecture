import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from '../../src/presentation/dtos/UserDto';
import { UserRole } from '../../src/domain/value-objects/_enums';
import { UserModel } from '../../src/infrastructure/models/mongodb/UserModel';
import { mongoHelper } from '../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { UserProps } from '../../src/domain/entities/user/UserProps';
import { AddressProps } from '../../src/domain/entities/address/AddressProps';
import {
  ZipCode,
  Birthday,
  Cpf,
  Email,
  HashedPassword,
  Name,
  Password,
  Phone,
  Role,
  UserName,
} from '../../src/domain/value-objects';
import { BcryptHasher } from '../../src/infrastructure/cryptography/BcryptHasher';
import { UserUseCaseDto } from '../../src/application/useCaseDtos/UserUseCaseDto';

export class MockData {
  static generateHexId(): string {
    return uuidv4().replace(/-/g, '').slice(0, 24);
  }

  static mockUserDto(): UserDto {
    const user = {
      username: faker.person.firstName(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      cpf: faker.string.numeric({ length: 11 }),
      phone: faker.string.numeric({ length: 11 }),
      birthday: faker.date.birthdate().toString(),
      role: faker.helpers.arrayElement([
        'admin',
        'customer',
        'driver',
        'restaurantAdmin',
      ]),
      address: {
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode('########'),
      },
      authentication: {
        password: 'Senh4**Corret4',
      },
    };
    return user;
  }

  static mockUserModel(
    withoudId: boolean = false
  ): UserModel | Omit<UserModel, '_id'> {
    const user = {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      username: faker.person.firstName(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      cpf: faker.string.numeric({ length: 11 }),
      phone: faker.string.numeric({ length: 11 }),
      role: 'user',
      birthday: faker.date.birthdate(),
      createdAt: new Date(),
    };

    if (withoudId) {
      const { _id, ...userWithoutId } = user;

      return userWithoutId;
    }

    return user;
  }

  static async mockUserProps(): Promise<UserProps> {
    const hash = new BcryptHasher(12);
    const password = Password.create('Senh4**Corret4').getRight();
    const hashedPassword = (
      await HashedPassword.create(password, hash)
    ).getRight();

    const user = {
      username: UserName.create(faker.person.firstName()).getRight(),
      name: Name.create(faker.person.firstName()).getRight(),
      email: Email.create(faker.internet.email()).getRight(),
      cpf: Cpf.create(faker.string.numeric({ length: 11 })).getRight(),
      phone: Phone.create(faker.string.numeric({ length: 11 })).getRight(),
      role: Role.create('user').getRight(),
      birthday: Birthday.create(faker.date.birthdate()).getRight(),
      address: {
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: ZipCode.create(faker.location.zipCode('########')).getRight(),
      },
      authentication: {
        hashedPassword: hashedPassword,
      },
    };
    return user;
  }

  static mockUserUseCaseDto(): UserUseCaseDto {
    const user = {
      username: faker.person.firstName(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      cpf: faker.string.numeric({ length: 11 }),
      phone: faker.string.numeric({ length: 11 }),
      role: 'user',
      address: {
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode('########'),
      },
    };
    return user;
  }
}
