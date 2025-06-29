import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { CustomerDTO } from '../../src/presentation/dtos/custumer-dto';
import { UserRole } from '../../src/domain/entities/value-objects/_enums';
import { CustomerModel } from '../../src/infrastructure/models/mongodb/CustomerModel';
import { mongoHelper } from '../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { CustomerProps } from '../../src/domain/entities/customer/CustomerProps';
import {
  Address,
  Cpf,
  Email,
  HashedPassword,
  Name,
  Password,
  Phone,
  Role,
  UserName,
} from '../../src/domain/entities/value-objects';
import { BcryptHasher } from '../../src/infrastructure/cryptography/BcryptHasher';
import { CustomerUseCaseDto } from '../../src/application/useCaseDtos/CustomerUseCaseDto';

export class MockData {
  static generateHexId(): string {
    return uuidv4().replace(/-/g, '').slice(0, 24);
  }

  static mockCustomerDTO(): CustomerDTO {
    const user = {
      username: faker.person.firstName(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      cpf: faker.string.numeric({ length: 11 }),
      phone: faker.string.numeric({ length: 11 }),
      role: 'customer',
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

  static mockCustomerModel(withoudId: boolean = false): CustomerModel | Omit<CustomerModel, "_id"> {
    const user = {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      username: faker.person.firstName(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      cpf: faker.string.numeric({ length: 11 }),
      phone: faker.string.numeric({ length: 11 }),
      role: 'customer',
      address: {
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode('########'),
      },
      authentication: {
        passwordHash: 'Senh4**Corret4',
      },
      createdAt: new Date(),
    };

    if(withoudId){
      const {_id, ...customerWithoutId} = user

      return customerWithoutId;
    }

    return user;
  }

  static async mockCustomerProps(): Promise<CustomerProps> {
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
      role: Role.create('customer').getRight(),
      address: Address.create({
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode('########'),
      }).getRight(),
      authentication: {
        hashedPassword: hashedPassword,
      },
    };
    return user;
  }

  static mockCustomerUseCaseDto(): CustomerUseCaseDto {
    const customer = {
      username: faker.person.firstName(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      phone: faker.string.numeric({ length: 11 }),
      role: 'customer',
      address: {
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode('########'),
      },
    };
    return customer;
  }
}
