import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbCustomerRepository } from '../../../../src/infrastructure/repositories/mongodb/MongodbCustomerRepository';
import {UserFactory} from '../../../domain/factories/UserFactory'
config();

const repository = new MongodbCustomerRepository();

describe('Testing MongodbCustomerRepository', () => {
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (MONGO_URI) {
      await mongoHelper.connect(MONGO_URI);
    } else {
      console.log('NO URI');
    }
  }, 60000);

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    await mongoHelper.clearCollection('users');
  });

  const users = [
    {
      username: 'John58633',
      name: 'John',
      email: 'jojo@email.com',
      cpf: '12587458567',
      phone: '21585874788',
      role: 'customer',
      birthday: new Date('2002-05-25'),
      createdAt: new Date(),
      address: {
        street: 'Test Street',
        city: 'Maringá',
        state: 'Pará',
        zipCode: '25874476',
      },
      authentication: {
        password: 'D@41refsFFesfsfa',
      },
    },
    {
      username: 'Dane77',
      name: 'Daniel',
      email: 'daniel@email.com',
      cpf: '12587458567',
      phone: '23885874788',
      role: 'customer',
      birthday: new Date('2000-05-20'),
      createdAt: new Date(),
      address: {
        street: 'Test Street',
        city: 'Maringá',
        state: 'Pará',
        zipCode: '25888476',
      },
      authentication: {
        password: 'D@41refsFF22fsfa',
      },
    },
  ];

  test('Should find a user by email', async () => {
    const userCollection = mongoHelper.getCollection('users');

    const user1 = users[0];
    const user2 = users[1];
  
    // Adding new users to database
    await userCollection.insertOne(user1);
    await userCollection.insertOne(user2);

    const foundUser = await repository.findByEmail(user1.email);

    expect(foundUser?.username).toBe(user1.username);
    expect(foundUser?.name).toBe(user1.name);
    expect(foundUser?.email).toBe(user1.email);
    expect(foundUser?.cpf).toBe(user1.cpf);
    expect(foundUser?.phone).toBe(user1.phone);
    expect(foundUser?.role).toBe(user1.role);
  });

  test('Should add a new user in the database', async () => {
    const userCollection = mongoHelper.getCollection('users');
    const user1 = {
      username: 'John58633',
      name: 'John',
      email: 'jojo@email.com',
      cpf: '12587458567',
      phone: '21585874788',
      role: 'customer',
      birthday: new Date('2002-05-25'),
      createdAt: new Date(),
      address: {
        street: 'Test Street',
        city: 'Maringá',
        state: 'Pará',
        zipCode: '25874476',
      },
      authentication: {
        passwordHash: 'D@41refsFFesfsfa',
      }
    }

    const customerEntity = UserFactory.create(
      {
        username: user1.username,
        name: user1.name,
        email: user1.email,
        cpf: user1.cpf,
        phone: user1.phone,
        role: user1.role,
        birthday: user1.birthday,
        address: user1.address,
        authentication: user1.authentication
      }
    )
  });
});
