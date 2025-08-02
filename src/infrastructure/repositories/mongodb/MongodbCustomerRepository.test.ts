import { mongoHelper } from '../../../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { config } from 'dotenv';
import { MongodbCustomerRepository } from '../../../../src/infrastructure/repositories/mongodb/MongodbCustomerRepository';
import { CustomerUser } from '../../../domain/entities/CustomerUser';
import { RawDataExtractor } from '../../../application/helpers/RawDataExtractor';
import { Address } from '../../../domain/entities/Address';
import { makeMockHasher } from '../../../tests/mocks/mockHasher';
import { Authentication } from '../../../domain/entities/Authentication';
import { Role } from '../../../domain/_enums';
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

  const hasher = makeMockHasher();
  const userRole = Role.customer;

  const users = [
    {
      username: 'John58633',
      name: 'John',
      email: 'jojo@email.com',
      cpf: '12587458567',
      phone: '21585874788',
      role: 'customer',
      birthday: '2002-05-25',
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
      birthday: '2002-04-25',
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

  test('should create a new customer in the repository', async () => {
    const userCollection = mongoHelper.getCollection('users');

    const createUserDTO = users[0];
    const rawAddressProps = RawDataExtractor.extractAddess(createUserDTO);
    const rawAutenticationProps =
      RawDataExtractor.extractAuthentication(createUserDTO);
    const rawUserProps = RawDataExtractor.extractUser(createUserDTO);

    const addressOrError = Address.create(rawAddressProps);
    const address = addressOrError.getRight();
    const authenticationOrError = await Authentication.create(
      rawAutenticationProps,
      hasher
    );
    const authentication = authenticationOrError.getRight();

    const customerOrError = CustomerUser.create(
      rawUserProps,
      address,
      authentication
    );
    const customer = customerOrError.getRight()

    const newCustomer = await repository.create(customer);

    if(newCustomer === null) {
      throw Error('User not created');
    }

    const id = newCustomer._id;

    const foundCustomer =  await userCollection.findOne({_id: id})

    expect(newCustomer.username).toBe(foundCustomer?.username);
    expect(newCustomer.name).toBe(foundCustomer?.name);
    expect(newCustomer.email).toBe(foundCustomer?.email);
    expect(newCustomer.cpf).toBe(foundCustomer?.cpf);
    expect(newCustomer.phone).toBe(foundCustomer?.phone);
    expect(newCustomer.role).toBe(foundCustomer?.role);
  });
  // test('should create a new user in the repository', async () => {
  //   const userCollection = mongoHelper.getCollection('users');

  //   const user1 = users[0];
  //   const user2 = users[1];

  //   // Adding new users to database
  //   await userCollection.insertOne(user1);
  //   await userCollection.insertOne(user2);

  //   const foundUser = await repository.findByEmail(user1.email);

  //   expect(foundUser?.username).toBe(user1.username);
  //   expect(foundUser?.name).toBe(user1.name);
  //   expect(foundUser?.email).toBe(user1.email);
  //   expect(foundUser?.cpf).toBe(user1.cpf);
  //   expect(foundUser?.phone).toBe(user1.phone);
  //   expect(foundUser?.role).toBe(user1.role);
  // });
});
